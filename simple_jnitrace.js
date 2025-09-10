// ================== 配置区 (Configuration Area) ==================
// 🔧 全局开关：设置为 false 可一键关闭所有黑名单过滤
var ENABLE_BLACKLIST = true;

// 🔧 字符串截断长度配置
var MAX_STRING_LENGTH = 800; // 字符串最大显示长度，超过将被截断

// 黑名单配置，用于过滤掉已知的系统类，减少噪音
var hookConfig = {
    // 类名黑名单: 以这些前缀开头的类的JNI调用将被忽略
    classBlacklist: [
        "android/system/ErrnoException",
        "com/android/webview",
        "com.android.webview",
        "org/chromium",
        "org.chromium.",         // 点号格式的 org.chromium 类
        "Lorg/chromium/",        // JNI格式的 org.chromium 类
        "Ljava/lang/",          // 过滤 Object, String, Class, Throwable 等
        "java.lang.",           // 点号格式的 java.lang 类
        "java/lang/",           // 斜杠格式的 java/lang 类
        "Ljava/lang/ref/",      // <-- 这条规则专门用于过滤 Reference, WeakReference 等
        "java.lang.ref.",       // 点号格式的 java.lang.ref 类
        "java/lang/ref/",       // 斜杠格式的 java/lang/ref 类
        "Ljava/util/",          // 过滤 HashMap, ArrayList 等
        "java.util.",           // 点号格式的 java.util 类
        "java/util/",           // 斜杠格式的 java/util 类
        "Ldalvik/system/",
        "dalvik.system.",       // 点号格式的 dalvik.system 类
        "dalvik/system/",       // 斜杠格式的 dalvik/system 类
        // "Landroid/os/",
        // "android.os.",          // 点号格式的 android.os 类
        // "android/os/",          // 斜杠格式的 android/os 类
        // "Landroid/util/",
        // "android.util.",        // 点号格式的 android.util 类
        // "android/util/",        // 斜杠格式的 android/util 类
        // "Landroid/app/",
        // "android.app.",         // 点号格式的 android.app 类
        // "android/app/",         // 斜杠格式的 android/app 类
        // "Landroid/content/",
        // "android.content.",     // 点号格式的 android.content 类
        // "android/content/",     // 斜杠格式的 android/content 类
        "Landroid/view/",
        "android.view.",        // 点号格式的 android.view 类
        "android/view/",        // 斜杠格式的 android/view 类
        "Llibcore/",
        "libcore.",             // 点号格式的 libcore 类
        "libcore/",             // 斜杠格式的 libcore 类
        // "Lcom/android/internal/",
        // "com.android.internal.", // 点号格式的 com.android.internal 类
        // "com/android/internal/", // 斜杠格式的 com.android.internal 类
        "Landroid/media/",
        "android.media.",        // 点号格式的 android.media 类
        "android/media/",         // 斜杠格式的 android/media 类
        "java/io",
        "java.io",
        "android.system.ErrnoException",
        "android.system.Struct"
    ],
    // 模块黑名单: 从这些系统库发起的调用将被忽略 (主要用于NewStringUTF等函数)
    moduleBlacklist: [
        // "libart.so",
        "libcore.so",
        "libjavacore.so",
        "libopenjdk.so"
    ],
    //字符串黑名单
    stringBlacklist: [
        "UTF-8",
        "org/chromium",
        "org.chromium",          // 点号格式的 chromium 字符串
        "WV.",
        "J.N",
        "/storage/emulated/0",
        "RESUME_ACTIVITY",
        "java/lang",
        "webview",               // webview 相关字符串
        "browser",               // 浏览器相关字符串
        "navigation",            // 导航相关字符串
        "video/",                // 视频编解码器相关
        "audio/",                // 音频编解码器相关
        "[B",                    // 字节数组签名
        "[C",                    // 字符数组签名
        "[I",                    // 整数数组签名
        "[Z",                    // 布尔数组签名
        "[F",                    // 浮点数组签名
        "[D",                    // 双精度数组签名
        "[J",                    // 长整型数组签名
        "[S",                     // 短整型数组签名
        "en-US",
        "zh-CN",
        "WebView",
        "utf8",
        "cr_media",
        "/system/fonts",
    ],
    //字符串白名单 - 只显示命中这些关键词的字符串, 因为frida hook字符串很容易崩, 除非修改rom..
    stringWhitelist: [
        // ===== ADB / 开发者选项 / 调试 =====
        "adb_", "adb", "adb_enabled", "service.adb.tcp.port", "service.adb.root",
        "android:debuggable", "debuggable", "ro.debuggable", "debug.isNativeDebuggable",
        "development_settings_enabled", "developer_options",
        "debug_app", "wait_for_debugger", "StrictMode",
        "method_tracing", "debuggerd",

        // ===== 代理 / VPN / 抓包 =====
        "http.proxyHost", "http.proxyPort", 
        "https.proxyHost", "https.proxyPort",
        "vpn", "tun0", "ppp", "wg0",

        // ===== Hook / 注入 / 动态调试框架 =====
        "hook_", "inlinehook", "inline_hook",
        "frida", "frida-server", "fridaserver", "re.frida.server", "Gadget", "libfrida",
        "substrate", "cydia", "com.saurik.substrate", "substrated",
        "xposed", "edxposed", "lsposed", "riru", "zygisk", "sandhook", "whale", "yahfa",
        "xposed_service",

        // ===== Root / 提权 / 常见SU路径/进程 =====
        "root", "su", "/su", "/system/xbin/su", "/system/bin/su", "/vendor/bin/su", "/sbin/su",
        "magisk", "MagiskHide", "/magisk", "/sbin/.magisk", "magiskd", "zygisk",
        "supersu", "superuser", "eu.chainfire.su", "com.topjohnwu.magisk", "supolicy",
        "busybox", "kingroot", "kinguser", "rootcloak", "uid=0(root)", "root@",

        // ===== 模拟器 / 虚拟化检测相关 =====
        "emulator", "google_sdk", "sdk_gphone", "android_x86",
        "genymotion", "vbox", "virtualbox", "vmware", "qemu", "goldfish", "ranchu", "generic",
        "bluestacks", "nox", "ldplayer", "memu", "koplayer", "droid4x", "andy",
        "ro.kernel.qemu", "ro.hardware.goldfish", "ro.hardware.ranchu",
        "ro.product.brand=generic", "ro.product.device=generic",
        "ro.product.model=sdk", "ro.build.tags=test-keys", "qemu.hw.mainkeys",

        // ===== 系统属性 / 构建标识 =====
        "ro.build.fingerprint", "ro.build.tags", "ro.build.type", "ro.build.version",
        "ro.secure", "ro.serialno", "ro.product", "ro.hardware",
        "ro.boot.verifiedbootstate", "ro.boot.flash.locked", "dm-verity",
        "persist.sys.usb.config",

        // ===== 证书 / 网络安全配置 / Pinning =====
        "networkSecurityConfig", "android:networkSecurityConfig", "cleartextTrafficPermitted",
        "TrustManager", "X509TrustManager", "InsecureTrustManager",
        "HostnameVerifier", "ALLOW_ALL_HOSTNAME_VERIFIER",
        "setHostnameVerifier", "setSSLSocketFactory",
        "CertificatePinner", "pinning", "OkHttpClient", "TrustKit",

        // ===== 锁屏 / 加密 / 设备安全状态 =====
        "keyguard", "isKeyguardLocked", "isKeyguardSecure",
        "isDeviceSecure", "DevicePolicyManager", "device_admin",
        "gatekeeper", "keystore", "fileencryption", "FBE", "FDE",
        "verifiedbootstate", "user_setup_complete",
        "lockscreen.password_type", "lockscreen.disabled",

        // ===== 调试器 / 跟踪 / 反调试线索 =====
        "ptrace", "TracerPid", "/proc/self/status", "/proc/maps",
        "gdbserver", "lldb", "strace", "ftrace",
        "/proc/net/tcp", "/proc/net/unix",

        // ===== 电量 / 充电状态 =====
        "ischarged", "isCharging", "BATTERY_STATUS_CHARGING",
        "ACTION_POWER_CONNECTED", "BATTERY_PLUGGED_USB", "dumpsys battery",

        // ===== 其他, 自己配置 =====
    ]

};

// 辅助函数：检查字符串是否在白名单中
function isWhitelistedString(str) {
    if (!str) return false;

    // 检查字符串是否包含白名单中的任何关键词
    return hookConfig.stringWhitelist.some(keyword => str.toLowerCase() == (keyword.toLowerCase()));
}

// 辅助函数：检查一个jclass对象是否在黑名单中
function isClassBlacklisted(jclass) {
    if (!ENABLE_BLACKLIST) {
        return false; // 黑名单开关关闭，不过滤任何类
    }

    if (!jclass) {
        return true; // 无效的 jclass 当作黑名单处理
    }
    try {
        var env = Java.vm.getEnv();
        var className = env.getClassName(jclass);
        // 检查 className 是否以黑名单中的任何一个前缀开头
        return hookConfig.classBlacklist.some(prefix => className.startsWith(prefix));
    } catch (e) {
        return true; // 获取类名失败也当黑名单处理
    }
}

// 辅助函数：检查字符串类名是否在黑名单中
function isClassNameBlacklisted(className) {
    if (!ENABLE_BLACKLIST) {
        return false; // 黑名单开关关闭，不过滤任何类名
    }

    if (!className) {
        return true;
    }
    return hookConfig.classBlacklist.some(prefix => className.startsWith(prefix));
}

// 辅助函数：截断长字符串
function truncateString(str, maxLength) {
    if (!str) return str;
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength) + "...[截断]";
}

// 辅助函数：检查模块是否在黑名单中
function isModuleBlacklisted(address) {
    if (!ENABLE_BLACKLIST) {
        return false; // 黑名单开关关闭，不过滤任何模块
    }

    if (!address) return false;
    try {
        var module = Process.findModuleByAddress(address);
        if (!module) return false;
        return hookConfig.moduleBlacklist.includes(module.name);
    } catch (e) {
        return false;
    }
}

//=================================================================
// 主函数：Hook libart.so 中的 JNI 函数
//=================================================================
function hookLibart() {
    // console.log("[*] 开始 Hook libart.so 中的 JNI 函数...");

    // 全局变量：存储特定方法的ID，用于参数打印
    var targetMethodIDs = new Map(); // 存储 methodID -> {className, methodName, signature}

    // 枚举 libart.so 中的符号
    var symbols = Module.enumerateSymbolsSync("libart.so");

    // 初始化各种 JNI 函数地址变量
    var getStringUTFCharsAddr = null;
    var newStringUTFAddr = null;
    var newStringAddr = null;  // 新增：NewString (用于UTF-16)
    var findClassAddr = null;
    var getMethodIDAddr = null;
    var getStaticMethodIDAddr = null;
    var getFieldIDAddr = null;
    var getStaticFieldIDAddr = null;
    var registerNativesAddr = null;
    var callObjectMethodAddr = null;
    var callStaticObjectMethodAddr = null;
    var callVoidMethodAddr = null;
    var callStaticIntMethodAddr = null; // 新增：用于调用返回int的静态方法

    // 遍历符号表，查找目标 JNI 函数
    for (var i = 0; i < symbols.length; i++) {
        var symbol = symbols[i];
        // 过滤符号：只处理包含 "JNI" 但不包含 "CheckJNI" 和 "__va_list" 的符号
        if (
            symbol.name.indexOf("JNI") >= 0 &&
            symbol.name.indexOf("CheckJNI") < 0 &&
            symbol.name.indexOf("__va_list") < 0
        ) {
            // 查找 GetStringUTFChars 函数
            if (symbol.name.indexOf("GetStringUTFChars") >= 0) {
                addrGetStringUTFChars = symbol.address;
                // 查找 NewStringUTF 函数
            } else if (symbol.name.indexOf("NewStringUTF") >= 0) {
                addrNewStringUTF = symbol.address;
                // 查找 NewString 函数
            } else if (symbol.name.indexOf("NewString") >= 0 && symbol.name.indexOf("NewStringUTF") < 0) {
                addrNewString = symbol.address;
                // 查找 FindClass 函数
            } else if (symbol.name.indexOf("FindClass") >= 0) {
                addrFindClass = symbol.address;
                // console.log("FindClass is at ", symbol.address, symbol.name);
                // 查找 GetMethodID 函数
            } else if (symbol.name.indexOf("GetMethodID") >= 0) {
                addrGetMethodID = symbol.address;
                // console.log("GetMethodID is at ", symbol.address, symbol.name);
                // 查找 GetStaticMethodID 函数
            } else if (symbol.name.indexOf("GetStaticMethodID") >= 0) {
                addrGetStaticMethodID = symbol.address;
                // console.log("GetStaticMethodID is at ", symbol.address, symbol.name);
                // 查找 GetFieldID 函数
            } else if (symbol.name.indexOf("GetFieldID") >= 0) {
                addrGetFieldID = symbol.address;
                // console.log("GetFieldID is at ", symbol.address, symbol.name);
                // 查找 GetStaticFieldID 函数
            } else if (symbol.name.indexOf("GetStaticFieldID") >= 0) {
                addrGetStaticFieldID = symbol.address;
                // console.log("GetStaticFieldID is at ", symbol.address, symbol.name);
                // 查找 RegisterNatives 函数
            } else if (symbol.name.indexOf("RegisterNatives") >= 0) {
                addrRegisterNatives = symbol.address;
                // console.log("RegisterNatives is at ", symbol.address, symbol.name);
                // 查找 CallObjectMethod 函数
            } else if (symbol.name.indexOf("CallObjectMethod") >= 0 && symbol.name.indexOf("art3JNI") >= 0 && symbol.name.indexOf("jmethodIDz") > 0) {
                //addrCallObjectMethod = symbol.address;
                // console.log("CallObjectMethod is at ", symbol.address, symbol.name);
                // 查找 CallStaticObjectMethod 函数
            } else if (symbol.name.indexOf("CallStaticObjectMethod") >= 0 && symbol.name.indexOf("art3") >= 0 && symbol.name.endsWith("jmethodIDz")) {
                addrCallStaticObjectMethod = symbol.address;
                // console.log("CallStaticObjectMethod is at ", symbol.address, symbol.name);
                // 查找 CallVoidMethod 函数
            } else if (symbol.name.indexOf("CallVoidMethod") >= 0 && symbol.name.indexOf("art3") >= 0 && symbol.name.endsWith("jmethodIDz")) {
                addrCallVoidMethod = symbol.address;
                // console.log("CallVoidMethod is at ", symbol.address, symbol.name);
                // 查找 CallStaticIntMethod 函数
            } else if (symbol.name.indexOf("CallStaticIntMethod") >= 0 && symbol.name.indexOf("art3") >= 0 && symbol.name.endsWith("jmethodIDz")) {
                addrCallStaticIntMethod = symbol.address;
                // console.log("CallStaticIntMethod is at ", symbol.address, symbol.name);
            }
        }
    }

    // Hook CallStaticObjectMethod - 调用静态对象方法
    if (addrCallStaticObjectMethod) {
        Interceptor.attach(ptr(addrCallStaticObjectMethod), {
            onEnter: function (args) {
                var env = args[0];       // JNIEnv*
                var jclass = args[1];     // Java 类
                var jmethodID = args[2];  // 方法 ID

                // 过滤黑名单类
                if (isClassBlacklisted(jclass)) {
                    return;
                }

                var threadId = Process.getCurrentThreadId();

                // 检查是否是目标方法
                var targetInfo = targetMethodIDs.get(jmethodID.toString());
                if (targetInfo) {
                    console.log("\n╔═══ [🎯目标方法调用] " + targetInfo.className + "." + targetInfo.methodName + " ═══╗");
                    console.log("║    🆔 方法ID: " + jmethodID);
                    console.log("║    🧵 线程ID: " + threadId);
                    console.log("╠════════════════════════════════════════════╣");

                    // 标记这次调用，在onLeave中打印返回值
                    this.isTargetCall = true;
                } else {
                    // 普通的静态方法调用
                    console.log("\n┌─── [静态对象方法调用] [TID:" + threadId + "]");
                    console.log("│    📌 JNIEnv*: " + env);
                    console.log("│    📌 JClass: " + jclass);
                    console.log("│    📌 JMethodID: " + jmethodID);

                    // 试图解析方法名和类名
                    try {
                        var methodName = Java.vm.getEnv().getMethodName(jmethodID);
                        var className = Java.vm.getEnv().getClassName(jclass);
                        console.log("│    📌 类->方法: " + className + "->" + methodName);
                    } catch (err) {
                        console.log("│    ❌ 获取方法/类名失败");
                    }
                    console.log("└───────────────────────────────────────────────────");
                }
            },
            onLeave: function (retval) {
                var threadId = Process.getCurrentThreadId();
                if (this.isTargetCall) {
                    // 目标方法的返回值
                    console.log("║    🎯 返回值: " + retval.toInt32());
                    console.log("╚════════════════════════════════════════════╝\n");
                } else {
                    // 普通方法的返回值
                    console.log("└─── [静态对象方法返回] [TID:" + threadId + "] 返回值: " + retval + "\n");
                }
            }
        });
    } else {
        console.log("[-] CallStaticObjectMethod symbol not found!");
    }

    // Hook CallVoidMethod - 调用void方法
    if (addrCallVoidMethod) {
        Interceptor.attach(ptr(addrCallVoidMethod), {
            onEnter: function (args) {
                var jniObj = args[1];
                if (jniObj.isNull()) return;

                var threadId = Process.getCurrentThreadId();

                try {
                    var jclass = Java.vm.getEnv().getObjectClass(jniObj);
                    // 过滤黑名单类
                    if (isClassBlacklisted(jclass)) {
                        return;
                    }

                    var className = Java.vm.getEnv().getClassName(jclass);
                    console.log("\n┌─── [Void方法调用] [TID:" + threadId + "]");
                    console.log("│    📌 JNIEnv*: " + args[0]);
                    console.log("│    📌 jobject: " + jniObj);
                    console.log("│    📌 jmethodID: " + args[2]);
                    console.log("│    📌 Java类: " + className);
                    console.log("└───────────────────────────────────────────────────");
                } catch (e) {
                    // 如果获取类失败，直接返回不打印
                    return;
                }
            },
            onLeave: function (retval) {
                var threadId = Process.getCurrentThreadId();
                console.log("└─── [Void方法返回] [TID:" + threadId + "] 返回值: " + retval + "\n");
            }
        });
    } else {
        console.log("[-] CallVoidMethod symbol not found!");
    }

    // Hook CallObjectMethod - 调用对象方法
    if (addrCallObjectMethod != null) {
        Interceptor.attach(addrCallObjectMethod, {
            onEnter: function (args) {
                // 获取调用的 Java 对象 (jobject)
                this.jobject = args[1];
                if (this.jobject.isNull()) return;

                var threadId = Process.getCurrentThreadId();

                try {
                    // 获取 Java 对象的类
                    var jclass = Java.vm.getEnv().getObjectClass(this.jobject);

                    // 过滤黑名单类
                    if (isClassBlacklisted(jclass)) {
                        return;
                    }

                    var className = Java.vm.getEnv().getClassName(jclass);

                    console.log("\n┌─── [对象方法调用] [TID:" + threadId + "]");
                    console.log("│    📌 JNIEnv: " + args[0]);
                    console.log("│    📌 jobject: " + this.jobject);
                    console.log("│    📌 jmethodID: " + args[2]);
                    console.log("│    📌 args_ptr: " + args[3]);
                    console.log("│    📌 Java类: " + className);
                    console.log("└───────────────────────────────────────────────────");
                } catch (e) {
                    // 如果获取类失败，直接返回不打印
                    return;
                }
            },
            onLeave: function (retval) {
                var threadId = Process.getCurrentThreadId();
                if (retval != null) {
                    console.log("└─── [对象方法返回] [TID:" + threadId + "] 返回值: " + retval + "\n");
                }
            }
        });
    }
    // Hook GetStringUTFChars - 获取UTF字符串
    if (addrGetStringUTFChars != null) {
        Interceptor.attach(addrGetStringUTFChars, {
            onEnter: function (args) {},
            onLeave: function (retval) {
                if (retval != null) {
                    var str = Memory.readCString(retval);

                    // 过滤包含点号的包名/类名（但保留短字符串，可能是配置值）
                    if (str.indexOf('.') > -1 && str.length > 5) {
                        return;
                    }

                    // 检查字符串黑名单
                    for (var i = 0; i < hookConfig.stringBlacklist.length; i++) {
                        if (str.indexOf(hookConfig.stringBlacklist[i]) > -1) {
                            return;
                        }
                    }

                    var threadId = Process.getCurrentThreadId();
                    var truncatedStr = truncateString(str, MAX_STRING_LENGTH);
                    console.log("[GetStringUTFChars] [TID:" + threadId + "] :" + truncatedStr);
                }
            }
        });
    }

    // Hook NewStringUTF - 专门针对Android 11+ (API 30+)

    var allNewStringUTFSymbols = symbols.filter(function (s) {
        return /NewStringUTF/.test(s.name);
    });

    // console.log("🔍 找到 " + allNewStringUTFSymbols.length + " 个NewStringUTF符号:");
    // allNewStringUTFSymbols.forEach(function(s) {
    //     console.log("  - " + s.name + " @ " + s.address);
    // });

    // var newStringUTFSymbols = symbols.filter(function(s) {
    //     // Android 11+ 精确符号匹配
    //     // if (!s.name.includes("NewStringUTF")) return false;

    //     // // 排除调试和编译器生成的符号
    //     // if (s.name.includes("CheckJNI")) return false;
    //     // if (s.name.includes("__uniq")) return false;
    //     // if (s.name.includes(".llvm")) return false;

    //     // Android 11+ 主要使用这种符号格式
    //     // _ZN3art3JNIILb1EE12NewStringUTFEP7_JNIEnvPKc
    //     // if (s.name.match(/_ZN3art3JNI.*Lb1.*NewStringUTF.*JNIEnv.*PKc$/)) return true;

    //     // // 备用：标准JNI实现
    //     // if (s.name.match(/_ZN3art3JNI.*NewStringUTF.*JNIEnv.*PKc$/)) 

    //     return true;

    //     // return false;
    // });

    // 优先选择最佳符号（Android 11+ 通常只有1-2个有效符号）
    // if (newStringUTFSymbols.length > 1) {
    //     // 优先选择Lb1变体
    //     newStringUTFSymbols.sort(function(a, b) {
    //         if (a.name.includes("Lb1") && !b.name.includes("Lb1")) return -1;
    //         if (!a.name.includes("Lb1") && b.name.includes("Lb1")) return 1;
    //         return 0;
    //     });
    //     // 只取最佳符号，避免重复Hook
    //     newStringUTFSymbols = newStringUTFSymbols.slice(0, 1);
    // }

    // console.log("✅ 选择Hook " + newStringUTFSymbols.length + " 个Android 11+优化符号:");
    // newStringUTFSymbols.forEach(function(s) {
    //     console.log("  ✓ " + s.name + " @ " + s.address);
    // });

    var hookCount = 0;
    allNewStringUTFSymbols.forEach(function (sym) {
        try {
            Interceptor.attach(sym.address, {
                onEnter: function (args) {
                    // art::JNI::NewStringUTF(JNIEnv* env, const char* bytes)
                    var cstrPtr = args[1];
                    if (cstrPtr.isNull()) return;

                    var s = null;
                    try {
                        s = Memory.readUtf8String(cstrPtr);
                    } catch (e) {
                        return;
                    }

                    if (!s) return;

                    var threadId = Process.getCurrentThreadId();

                    // 检查白名单：优先显示白名单中的重要字符串
                    var isInWhitelist = isWhitelistedString(s);

                    // 如果字符串在白名单中，直接显示
                    if (isInWhitelist) {
                        console.log("\n┌─── [⭐白名单UTF字符串] [TID:" + threadId + "]");
                        var truncatedStr = truncateString(s, MAX_STRING_LENGTH);
                        console.log("│      UTF-8字符串: \"" + truncatedStr + "\"");
                        console.log("└──────────────────────────────────────────\n");
                        return;
                    }

                    // 特殊关注重要字符串 (保留原有的adb_过滤逻辑)
                    // var isImportant = s.includes("adb_");

                    // if (isImportant) {
                    //     // 检查字符串黑名单
                    //     var isBlacklisted = false;
                    //     if (ENABLE_BLACKLIST) {
                    //         for (var i = 0; i < config.str_black_list.length; i++) {
                    //             if (s.includes(config.str_black_list[i])) {
                    //                 isBlacklisted = true;
                    //                 break;
                    //             }
                    //         }
                    //     }

                    //     if (!isBlacklisted) {
                    //         console.log("\n┌─── [🎯UTF字符串创建] [TID:" + threadId + "]");
                    //          var truncatedStr = truncateString(s, MAX_STRING_LENGTH);
                    //         console.log("│      UTF-8字符串: \"" + truncatedStr + "\"");
                    //         console.log("└──────────────────────────────────────────\n");
                    //     }
                    // }
                },
                onLeave: function (retval) {
                    // 可以在这里处理返回值
                }
            });
            hookCount++;
        } catch (e) {
            // 忽略Hook失败的符号
        }
    });

    // Hook FindClass - 查找类
    if (addrFindClass != null) {
        Interceptor.attach(addrFindClass, {
            onEnter: function (args) {
                if (args[1] != null) {
                    var name = Memory.readCString(args[1]);

                    // 过滤黑名单类名
                    if (isClassNameBlacklisted(name)) {
                        return;
                    }

                    var threadId = Process.getCurrentThreadId();
                    var stackTraceMsg = Thread.backtrace(this.context, Backtracer.ACCURATE)
                        .slice(1) // 跳过第一行（当前函数）
                        .map(DebugSymbol.fromAddress).join('\n');
                    console.log("\n┌─── [查找类] [TID:" + threadId + "]");
                    console.log("│    🔍 类名: " + truncateString(name, MAX_STRING_LENGTH));
                    console.log("│    📄 堆栈跟踪:");
                    console.log("│    " + truncateString(stackTraceMsg.replace(/\n/g, "\n│    "), MAX_STRING_LENGTH * 3));
                    console.log("└──────────────────────────────────────────\n");
                }
            },
            onLeave: function (retval) { }
        });
    }
    // Hook GetMethodID - 获取方法ID
    if (addrGetMethodID != null) {
        Interceptor.attach(ptr(addrGetMethodID), {
            onEnter: function (args) {
                this.env = args[0];         // JNIEnv
                this.jclass = args[1];      // jclass
                
                // 检查参数有效性
                if (!this.jclass || this.jclass.isNull()) {
                    return;
                }
                
                // 过滤黑名单类
                if (isClassBlacklisted(this.jclass)) {
                    return;
                }
                
                this.method_name = args[2].readCString();
                this.method_sig = args[3].readCString();
                
                var threadId = Process.getCurrentThreadId();
                var className = Java.vm.getEnv().getClassName(this.jclass);

                console.log("\n┌─── [调用方法] [TID:" + threadId + "]");
                console.log("│    🎯 类->方法: " + truncateString(className + "->" + this.method_name + this.method_sig, MAX_STRING_LENGTH));
                console.log("└──────────────────────────────────────────\n");
            },
            onLeave: function (retval) {
                //console.log(" |--> Method ID: " + retval);
            }
        });
    }

    // Hook GetStaticMethodID - 获取静态方法ID
    if (addrGetStaticMethodID != null) {
        Interceptor.attach(addrGetStaticMethodID, {
            onEnter: function (args) {
                if (args[2] != null) {
                    var jclass = args[1];
                    
                    // 过滤黑名单类
                    if (isClassBlacklisted(jclass)) {
                        return;
                    }
                    
                    this.method_name = Memory.readCString(args[2]);
                    var threadId = Process.getCurrentThreadId();
                    var className = Java.vm.getEnv().getClassName(jclass);
                    
                    if (args[3] != null) {
                        var sig = Memory.readCString(args[3]);
                        console.log("\n┌─── [获取静态方法ID] [TID:" + threadId + "]");
                        console.log("│    🎯 类->方法: " + truncateString(className + "->" + this.method_name + sig, MAX_STRING_LENGTH));
                    } else {
                        console.log("\n┌─── [获取静态方法ID] [TID:" + threadId + "]");
                        console.log("│    🎯 类->方法: " + truncateString(className + "->" + this.method_name, MAX_STRING_LENGTH));
                    }
                    console.log("└──────────────────────────────────────────\n");
                }
            },
            onLeave: function (retval) {
                // 如果是目标方法，记录其methodID  
                if (this.isTargetMethod && retval) {
                    targetMethodIDs.set(retval.toString(), {
                        className: this.targetClassName,
                        methodName: this.targetMethodName,
                        signature: this.targetSignature
                    });
                    console.log("🎯 已记录目标方法ID: " + retval + " -> " + this.targetClassName + "." + this.targetMethodName);
                }
            }
        });
    }
    // Hook GetFieldID - 获取字段ID
    if (addrGetFieldID != null) {
        Interceptor.attach(addrGetFieldID, {
            onEnter: function (args) {
                if (args[2] != null) {
                    var jclass = args[1];
                    
                    // 检查参数有效性
                    if (!jclass || jclass.isNull()) {
                        return;
                    }

                    // 过滤黑名单类
                    if (isClassBlacklisted(jclass)) {
                        return;
                    }
                    
                    var name = Memory.readCString(args[2]);
                    var threadId = Process.getCurrentThreadId();
                    var className = Java.vm.getEnv().getClassName(jclass);

                    if (args[3] != null) {
                        var sig = Memory.readCString(args[3]);
                        console.log("\n┌─── [获取字段ID] [TID:" + threadId + "]");
                        console.log("│    📎 类.字段: " + truncateString(className + "." + name + ":" + sig, MAX_STRING_LENGTH));
                    } else {
                        console.log("\n┌─── [获取字段ID] [TID:" + threadId + "]");
                        console.log("│    📎 类.字段: " + truncateString(className + "." + name, MAX_STRING_LENGTH));
                    }
                    console.log("└──────────────────────────────────────────\n");
                }
            },
            onLeave: function (retval) { }
        });
    }
    // Hook GetStaticFieldID - 获取静态字段ID
    if (addrGetStaticFieldID != null) {
        Interceptor.attach(addrGetStaticFieldID, {
            onEnter: function (args) {
                if (args[2] != null) {
                    var jclass = args[1];
                    
                    // 检查参数有效性
                    if (!jclass || jclass.isNull()) {
                        return;
                    }

                    // 过滤黑名单类
                    if (isClassBlacklisted(jclass)) {
                        return;
                    }
                    
                    var name = Memory.readCString(args[2]);
                    var threadId = Process.getCurrentThreadId();
                    var className = Java.vm.getEnv().getClassName(jclass);

                    if (args[3] != null) {
                        var sig = Memory.readCString(args[3]);
                        console.log("\n┌─── [获取静态字段ID] [TID:" + threadId + "]");
                        console.log("│    📎 类.字段: " + truncateString(className + "." + name + ":" + sig, MAX_STRING_LENGTH));
                    } else {
                        console.log("\n┌─── [获取静态字段ID] [TID:" + threadId + "]");
                        console.log("│    📎 类.字段: " + truncateString(className + "." + name, MAX_STRING_LENGTH));
                    }
                    console.log("└──────────────────────────────────────────\n");
                }
            },
            onLeave: function (retval) { }
        });
    }
    // Hook RegisterNatives - 注册本地方法
    if (addrRegisterNatives != null) {
        Interceptor.attach(addrRegisterNatives, {
            onEnter: function (args) {
                var env = args[0];
                var java_class = args[1];

                // 过滤黑名单类 - RegisterNatives 不过滤，因为这是高价值信息
                // if (isBlacklistedClass(java_class)) {
                //     return;
                // }

                var threadId = Process.getCurrentThreadId();
                var class_name = Java.vm.tryGetEnv().getClassName(java_class);
                var methods_ptr = ptr(args[2]);
                var method_count = parseInt(args[3]);

                // 检查是否所有方法都来自so文件，如果是则忽略
                var all_from_so = true;
                for (var i = 0; i < method_count; i++) {
                    var fnPtr_ptr = Memory.readPointer(methods_ptr.add(i * Process.pointerSize * 3 + Process.pointerSize * 2));
                    var find_module = Process.findModuleByAddress(fnPtr_ptr);

                    if (!find_module || !find_module.name.endsWith('.so')) {
                        all_from_so = false;
                        break;
                    }
                }

                // 如果所有方法都来自so文件，则忽略
                if (all_from_so) {
                    return;
                }

                console.log("\n╔═══ [注册本地方法] [TID:" + threadId + "] ═══╗");
                console.log("║    🏛️  类: " + truncateString(class_name, MAX_STRING_LENGTH));
                console.log("║    📊 方法数量: " + method_count);
                console.log("╠════════════════════════════════════════════╣");

                for (var i = 0; i < method_count; i++) {
                    var name_ptr = Memory.readPointer(methods_ptr.add(i * Process.pointerSize * 3));
                    var sig_ptr = Memory.readPointer(methods_ptr.add(i * Process.pointerSize * 3 + Process.pointerSize));
                    var fnPtr_ptr = Memory.readPointer(methods_ptr.add(i * Process.pointerSize * 3 + Process.pointerSize * 2));

                    var name = Memory.readCString(name_ptr);
                    var sig = Memory.readCString(sig_ptr);
                    var find_module = Process.findModuleByAddress(fnPtr_ptr);

                    console.log("║    🔧 方法: " + truncateString(name, MAX_STRING_LENGTH));
                    console.log("║       └─ 签名: " + truncateString(sig, MAX_STRING_LENGTH));
                    console.log("║       └─ 地址: " + fnPtr_ptr);
                    console.log("║       └─ 模块: " + find_module.name + " (偏移: " + ptr(fnPtr_ptr).sub(find_module.base) + ")");
                    if (i < method_count - 1) {
                        console.log("║    ────────────────────────────────────────");
                    }
                }
                console.log("╚════════════════════════════════════════════╝\n");
            },
            onLeave: function (retval) { }
        });
    }

    // Hook CallStaticIntMethod - 调用返回int的静态方法  
    if (addrCallStaticIntMethod) {
        Interceptor.attach(ptr(addrCallStaticIntMethod), {
            onEnter: function (args) {
                var env = args[0];       // JNIEnv*
                var jclass = args[1];     // Java 类
                var jmethodID = args[2];  // 方法 ID

                // 过滤黑名单类
                if (isClassBlacklisted(jclass)) {
                    return;
                }

                var threadId = Process.getCurrentThreadId();

                // 检查是否是目标方法
                var targetInfo = targetMethodIDs.get(jmethodID.toString());
                if (targetInfo) {
                    console.log("\n╔═══ [🎯目标Int方法调用] " + targetInfo.className + "." + targetInfo.methodName + " ═══╗");
                    console.log("║    🆔 方法ID: " + jmethodID);
                    console.log("║    🧵 线程ID: " + threadId);
                    console.log("╠════════════════════════════════════════════╣");

                    // 标记这次调用，在onLeave中打印返回值
                    this.isTargetCall = true;
                } else {
                    // 普通的静态int方法调用
                    console.log("\n┌─── [静态Int方法调用] [TID:" + threadId + "]");
                    console.log("│    📌 JNIEnv*: " + env);
                    console.log("│    📌 JClass: " + jclass);
                    console.log("│    📌 JMethodID: " + jmethodID);

                    // 试图解析方法名和类名
                    try {
                        var methodName = Java.vm.getEnv().getMethodName(jmethodID);
                        var className = Java.vm.getEnv().getClassName(jclass);
                        console.log("│    📌 类->方法: " + className + "->" + methodName);
                    } catch (err) {
                        console.log("│    ❌ 获取方法/类名失败");
                    }
                    console.log("└───────────────────────────────────────────────────");
                }
            },
            onLeave: function (retval) {
                var threadId = Process.getCurrentThreadId();
                if (this.isTargetCall) {
                    // 目标方法的返回值
                    console.log("║    🎯 返回值: " + retval.toInt32());
                    console.log("╚════════════════════════════════════════════╝\n");
                } else {
                    // 普通方法的返回值
                    console.log("└─── [静态Int方法返回] [TID:" + threadId + "] 返回值: " + retval.toInt32() + "\n");
                }
            }
        });
    }
}

Java.perform(function () {
    hookLibart();
});
