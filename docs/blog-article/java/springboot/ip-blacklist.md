---
title: 基于SpringBoot IP黑白名单的实现
description: 基于SpringBoot IP黑白名单的实现
tags:
  - SpringBoot
  - IP
  - 黑白名单
date: 2020-05-20T00:00:00.000Z
createTime: 2025/08/25 23:47:02
permalink: /article/2w2ljf4m/
---

[[toc]]

# 基于SpringBoot IP黑白名单的实现

## 业务场景

IP黑白名单是网络安全管理中常见的策略工具，用于控制网络访问权限，根据业务场景的不同，其应用范围广泛，以下是一些典型业务场景：

### 服务器安全防护：

黑名单：可以用来阻止已知的恶意IP地址或曾经尝试攻击系统的IP地址，防止这些来源对服务器进行未经授权的访问、扫描、攻击等行为。
白名单：仅允许特定IP或IP段访问关键服务，比如数据库服务器、内部管理系统等，实现最小授权原则，降低被未知风险源入侵的可能性。

### 网站安全防护：

黑名单：对于频繁发起恶意请求、爬取数据、DDoS攻击等活动的IP，将其加入黑名单以限制其对网站的访问。
白名单：如果只希望特定合作伙伴、内部员工或特定区域用户访问网站内容，则可通过白名单来限定合法访问者的范围。

### API接口保护：

对于对外提供的API接口，通过设置IP黑白名单，确保只有经过认证或信任的系统和客户端才能调用接口。
比如比较容易被盗刷的短信接口、文件接口，都需要添加IP黑白名单加以限制。

## 核心实现

### 获取客户端IP地址

```java

@UtilityClass
public class IpUtils {
    private final String UNKNOWN = "unknown";
    private final String X_FORWARDED_FOR = "X-Forwarded-For";
    private final String PROXY_CLIENT_IP = "Proxy-Client-IP";
    private final String WL_PROXY_CLIENT_IP = "WL-Proxy-Client-IP";
    private final Pattern COMMA_SEPARATED_VALUES_PATTERN = Pattern.compile("\s*,\s*");

    /**
     * 默认情况下内网代理的子网可以是（后面有需要可以进行配置）：
     * 1. 10/8
     * 2. 192.168/16
     * 3. 169.254/16
     * 4. 127/8
     * 5. 172.16/12
     * 6. ::1
     */
    private final Pattern INTERNAL_PROXIES = Pattern.compile(
            "10\.\d{1,3}\.\d{1,3}\.\d{1,3}|" +
                    "192\.168\.\d{1,3}\.\d{1,3}|" +
                    "169\.254\.\d{1,3}\.\d{1,3}|" +
                    "127\.\d{1,3}\.\d{1,3}\.\d{1,3}|" +
                    "172\.1[6-9]\.\d{1,3}\.\d{1,3}|" +
                    "172\.2[0-9]\.\d{1,3}\.\d{1,3}|" +
                    "172\.3[0-1]\.\d{1,3}\.\d{1,3}|" +
                    "0:0:0:0:0:0:0:1|::1"
    );

    /**
     * 获取请求的IP
     *
     * @return 请求的IP
     */
    public String getIp() {
        var requestAttributes = RequestContextHolder.getRequestAttributes();
        if (Objects.isNull(requestAttributes)) {
            return null;
        }
        var request = ((ServletRequestAttributes) requestAttributes).getRequest();
        var ip = getRemoteIp(request);
        if (!StringUtils.hasLength(ip) || UNKNOWN.equalsIgnoreCase(ip)) {
            ip = request.getHeader(PROXY_CLIENT_IP);
        }
        if (!StringUtils.hasLength(ip) || UNKNOWN.equalsIgnoreCase(ip)) {
            ip = request.getHeader(WL_PROXY_CLIENT_IP);
        }
        if (!StringUtils.hasLength(ip) || UNKNOWN.equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }

    /**
     * 获取客户端真实IP地址，防止使用X-Forwarded-For进行IP伪造攻击，防御思路见类注释
     *
     * @return 真实IP地址
     */
    private String getRemoteIp(HttpServletRequest request) {
        var remoteIp = request.getRemoteAddr();
        var isInternal = INTERNAL_PROXIES.matcher(remoteIp).matches();

        if (isInternal) {
            var concatRemoteIpHeaderValue = new StringBuilder();

            for (var e = request.getHeaders(X_FORWARDED_FOR); e.hasMoreElements(); ) {
                if (concatRemoteIpHeaderValue.length() > 0) {
                    concatRemoteIpHeaderValue.append(", ");
                }
                concatRemoteIpHeaderValue.append(e.nextElement());
            }

            var remoteIpHeaderValue = commaDelimitedListToArray(concatRemoteIpHeaderValue.toString());
            for (var i = remoteIpHeaderValue.length - 1; i >= 0; i--) {
                var currentRemoteIp = remoteIpHeaderValue[i];
                if (!INTERNAL_PROXIES.matcher(currentRemoteIp).matches()) {
                    return currentRemoteIp;
                }
            }
            return null;
        } else {
            return remoteIp;
        }
    }

    private String[] commaDelimitedListToArray(String commaDelimitedStrings) {
        return (commaDelimitedStrings == null || commaDelimitedStrings.isEmpty())
                ? new String[0]
                : COMMA_SEPARATED_VALUES_PATTERN.split(commaDelimitedStrings);
    }
}
```

获取到客户端IP后，我们只要比对客户端IP是否在配置的白名单/黑名单中即可。 为了简化使用，可以采用注解的方式进行拦截。

### 新增注解`@IpCheck`

```java
/**
 * IP白名单校验
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD})
@Documented
@Inherited
public @interface IpCheck {

    /**
     * 白名单IP列表，支持${...}
     */
    @AliasFor("whiteList")
    String value() default "";

    /**
     * 白名单IP列表，支持${...}
     */
    @AliasFor("value")
    String whiteList() default "";

    /**
     * 黑名单IP列表，支持${...}
     */
    String blackList() default "";

}
```

### 新增IpCheckHandlerInterceptorImpl

我们实现`HandlerInterceptor`，在接口上进行拦截，如果不满足配置的黑白名单，则抛出异常。

```java
/**
 * @author <a href="mailto:gcwm99@gmail.com">gcdd1993</a>
 * Created by gcdd1993 on 2023/9/20
 */
@Component
public class IpCheckHandlerInterceptorImpl implements HandlerInterceptor, EmbeddedValueResolverAware {
    private StringValueResolver stringValueResolver;

    @Override
    public boolean preHandle(@NonNull HttpServletRequest request,
                             @NonNull HttpServletResponse response,
                             @NonNull Object handler) {
        // 检查是否有IpWhitelistCheck注解，并且是否开启IP白名单检查
        if (!(handler instanceof HandlerMethod)) {
            return true;  // 如果没有注解或者注解中关闭了IP白名单检查，则继续处理请求
        }
        var handlerMethod = (HandlerMethod) handler;
        var method = handlerMethod.getMethod();
        var annotation = AnnotationUtils.getAnnotation(method, IpCheck.class);
        if (annotation == null) {
            return true;
        }
        var clientIp = IpUtils.getIp();

        // 检查客户端IP是否在白名单中
        var whiteList = Stream.of(Optional.ofNullable(stringValueResolver.resolveStringValue(annotation.whiteList()))
                        .map(it -> it.split(","))
                        .orElse(new String[]{}))
                .filter(StringUtils::hasText)
                .map(String::trim)
                .collect(Collectors.toUnmodifiableSet());
        if (!whiteList.isEmpty() && whiteList.contains(clientIp)) {
            return true; // IP在白名单中，继续处理请求
        }
        var blackList = Stream.of(Optional.ofNullable(stringValueResolver.resolveStringValue(annotation.blackList()))
                        .map(it -> it.split(","))
                        .orElse(new String[]{}))
                .filter(StringUtils::hasText)
                .map(String::trim)
                .collect(Collectors.toUnmodifiableSet());
        if (!blackList.isEmpty() && !blackList.contains(clientIp)) {
            return true; // IP不在黑名单中，继续处理请求
        }
        // IP不在白名单中，可以返回错误响应或者抛出异常
        // 例如，返回一个 HTTP 403 错误
        throw new RuntimeException("Access denied, remote ip " + clientIp + " is not allowed.");
    }

    @Override
    public void setEmbeddedValueResolver(StringValueResolver resolver) {
        this.stringValueResolver = resolver;
    }
}

```

## 自动装配

核心逻辑写完了，该怎么使用呢？为了达到开箱即用的效果，我们可以接着新增自动装配的代码

### 新建`IpCheckConfig`

实现`WebMvcConfigurer`接口，添加接口拦截器

```java
/**
 * @author <a href="mailto:gcwm99@gmail.com">gcdd1993</a>
 * Created by gcdd1993 on 2024/1/24
 */
public class IpCheckConfig implements WebMvcConfigurer {

    @Resource
    private IpCheckHandlerInterceptorImpl ipCheckHandlerInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(ipCheckHandlerInterceptor);
    }

}
```

### 新建`@EnableIpCheck`

参考`@EnableScheduling`的实现，自己实现一个`@EnableIpCheck`，该注解可以控制功能是否启用

```java
/**
 * @author <a href="mailto:gcwm99@gmail.com">gcdd1993</a>
 * Created by gcdd1993 on 2024/1/24
 */
@Retention(value = RetentionPolicy.RUNTIME)
@Target(value = ElementType.TYPE)
@Documented
@ComponentScan("xxx.ip") // 这里是IpCheckConfig的包名
@Import(IpCheckConfig.class)
public @interface EnableIpCheck {
}
```

## 业务测试

简单地用代码来试验下效果

### 新建`SampleApplication`

```java

@SpringBootApplication
@EnableIpCheck
public class SampleApplication {

    public static void main(String[] args) {
        SpringApplication.run(SampleApplication.class, args);
    }

}
```

### 新建测试接口

```java

@RestController
@RequestMapping("/sample/ip-checker")
public class IpCheckSample {

    @GetMapping("/white")
    @IpCheck(value = "0:0:0:0:0:0:0:1")
    String whiteList() {
        return "127.0.0.1";
    }

    @GetMapping("/black")
    @IpCheck(blackList = "0:0:0:0:0:0:0:1")
    String blackList() {
        return "127.0.0.1";
    }

    /**
     * 同时配置白名单和黑名单，要求IP既在白名单，并且不在黑名单，否则抛出异常
     */
    @GetMapping("/all")
    @IpCheck(value = "0:0:0:0:0:0:0:1", blackList = "0:0:0:0:0:0:0:1")
    String all() {
        return "127.0.0.1";
    }

    /**
     * 同时配置白名单和黑名单，要求IP既在白名单，并且不在黑名单，否则抛出异常
     * 支持解析Spring 配置文件
     */
    @GetMapping("/config")
    @IpCheck(value = "${digit.ip.check.white-list}", blackList = "${digit.ip.check.black-list}")
    String config() {
        return "127.0.0.1";
    }

    /**
     * 同时配置白名单和黑名单，要求IP既在白名单，并且不在黑名单，否则抛出异常
     * 支持解析Spring 配置文件
     */
    @GetMapping("/black-config")
    @IpCheck(blackList = "${digit.ip.check.black-list}")
    String blackConfig() {
        return "127.0.0.1";
    }

}
```

由于本机请求IP地址是`0:0:0:0:0:0:0:1`，所以这里使用`0:0:0:0:0:0:0:1`而不是`127.0.0.1`。

#### 访问`/sample/ip-checker/white`

接口返回127.0.0.1

#### 访问`/sample/ip-checker/black`

```bash
java.lang.RuntimeException:Access denied,remote ip 0:0:0:0:0:0:0:1is not allowed.
```

#### 访问`/sample/ip-checker/all`

接口返回127.0.0.1

既配置白名单，也配置黑名单，需要既不在白名单，同时在黑名单里，才会拦截。
修改配置

```yaml
digit:
  ip:
  check:
  white-list:127.0.0.1,192.168.1.1,192.168.1.2
  black-list:127.0.0.1,192.168.1.1,192.168.1.2,0:0:0:0:0:0:0:1
```

#### 访问`/sample/ip-checker/black-config`

```bash
java.lang.RuntimeException:Access denied,remote ip 0:0:0:0:0:0:0:1is not allowed.
```

最后，可以结合配置中心，以便配置后立即生效。
