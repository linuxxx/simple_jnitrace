// ================== 配置区 (Configuration Area) ==================
var ENABLE_BLACKLIST = true;
var MAX_STRING_LENGTH = 800;

// 是否打印 GetMethodID / GetStaticMethodID 解析日志
var PRINT_METHOD_ID_LOG = true;

// 是否打印 GetFieldID / GetStaticFieldID 解析日志
var PRINT_FIELD_ID_LOG = true;

// 是否打印 void 方法调用。默认 false，减少噪音
var PRINT_VOID_CALL = false;

// 是否打印对象方法返回值
var PRINT_OBJECT_RETURN = true;

// 是否打印基本类型方法返回值
var PRINT_PRIMITIVE_RETURN = true;

// 只打印这些返回签名。为空数组表示不过滤。
// 常用返回签名:
// String: Ljava/lang/String;
// int: I
// boolean: Z
// long: J
// object: Lxxx/xxx;
// array: [I / [B / [Ljava/lang/String;
var RETURN_SIGNATURE_WHITELIST = [
    "Ljava/lang/String;",
    "I",
    "Z",
    "J",
    "D",
    "F",
    "Ljava/lang/Object;"
];

// 方法名白名单。为空数组表示不过滤。
var METHOD_NAME_WHITELIST = [
    // "getPackageName",
    // "getString",
    // "getInt",
    // "getApiKey",
    // "getToken"
];

var hookConfig = {
    classBlacklist: [
        "android/system/ErrnoException",
        "com/android/webview",
        "com.android.webview",
        "org/chromium",
        "org.chromium.",
        "Lorg/chromium/",
        "Ljava/lang/",
        "java.lang.",
        "java/lang/",
        "Ljava/lang/ref/",
        "java.lang.ref.",
        "java/lang/ref/",
        "Ljava/util/",
        "java.util.",
        "java/util/",
        "Ldalvik/system/",
        "dalvik.system.",
        "dalvik/system/",
        "Landroid/view/",
        "android.view.",
        "android/view/",
        "Llibcore/",
        "libcore.",
        "libcore/",
        "Landroid/media/",
        "android.media.",
        "android/media/",
        "java/io",
        "java.io",
        "android.system.ErrnoException",
        "android.system.Struct"
    ],
    moduleBlacklist: [
        "libcore.so",
        "libjavacore.so",
        "libopenjdk.so"
    ],
    stringBlacklist: [
        "UTF-8",
        "org/chromium",
        "org.chromium",
        "WV.",
        "J.N",
        "/storage/emulated/0",
        "RESUME_ACTIVITY",
        "java/lang",
        "webview",
        "browser",
        "navigation",
        "video/",
        "audio/",
        "[B",
        "[C",
        "[I",
        "[Z",
        "[F",
        "[D",
        "[J",
        "[S",
        "en-US",
        "zh-CN",
        "WebView",
        "utf8",
        "cr_media",
        "/system/fonts"
    ],
    stringWhitelist: [
        "adb_", "adb", "adb_enabled", "service.adb.tcp.port", "service.adb.root",
        "android:debuggable", "debuggable", "ro.debuggable", "debug.isNativeDebuggable",
        "development_settings_enabled", "developer_options",
        "debug_app", "wait_for_debugger", "StrictMode",
        "method_tracing", "debuggerd",

        "http.proxyHost", "http.proxyPort",
        "https.proxyHost", "https.proxyPort",
        "vpn", "tun0", "ppp", "wg0",

        "hook_", "inlinehook", "inline_hook",
        "frida", "frida-server", "fridaserver", "re.frida.server", "Gadget", "libfrida",
        "substrate", "cydia", "com.saurik.substrate", "substrated",
        "xposed", "edxposed", "lsposed", "riru", "zygisk", "sandhook", "whale", "yahfa",
        "xposed_service",

        "root", "su", "/su", "/system/xbin/su", "/system/bin/su", "/vendor/bin/su", "/sbin/su",
        "magisk", "MagiskHide", "/magisk", "/sbin/.magisk", "magiskd", "zygisk",
        "supersu", "superuser", "eu.chainfire.su", "com.topjohnwu.magisk", "supolicy",
        "busybox", "kingroot", "kinguser", "rootcloak", "uid=0(root)", "root@",

        "emulator", "google_sdk", "sdk_gphone", "android_x86",
        "genymotion", "vbox", "virtualbox", "vmware", "qemu", "goldfish", "ranchu", "generic",
        "bluestacks", "nox", "ldplayer", "memu", "koplayer", "droid4x", "andy",
        "ro.kernel.qemu", "ro.hardware.goldfish", "ro.hardware.ranchu",
        "ro.product.brand=generic", "ro.product.device=generic",
        "ro.product.model=sdk", "ro.build.tags=test-keys", "qemu.hw.mainkeys",

        "ro.build.fingerprint", "ro.build.tags", "ro.build.type", "ro.build.version",
        "ro.secure", "ro.serialno", "ro.product", "ro.hardware",
        "ro.boot.verifiedbootstate", "ro.boot.flash.locked", "dm-verity",
        "persist.sys.usb.config",

        "networkSecurityConfig", "android:networkSecurityConfig", "cleartextTrafficPermitted",
        "TrustManager", "X509TrustManager", "InsecureTrustManager",
        "HostnameVerifier", "ALLOW_ALL_HOSTNAME_VERIFIER",
        "setHostnameVerifier", "setSSLSocketFactory",
        "CertificatePinner", "pinning", "OkHttpClient", "TrustKit",

        "keyguard", "isKeyguardLocked", "isKeyguardSecure",
        "isDeviceSecure", "DevicePolicyManager", "device_admin",
        "gatekeeper", "keystore", "fileencryption", "FBE", "FDE",
        "verifiedbootstate", "user_setup_complete",
        "lockscreen.password_type", "lockscreen.disabled",

        "ptrace", "TracerPid", "/proc/self/status", "/proc/maps",
        "gdbserver", "lldb", "strace", "ftrace",
        "/proc/net/tcp", "/proc/net/unix",

        "ischarged", "isCharging", "BATTERY_STATUS_CHARGING",
        "ACTION_POWER_CONNECTED", "BATTERY_PLUGGED_USB", "dumpsys battery"
    ]
};

function truncateString(str, maxLength) {
    if (str === null || str === undefined) return str;
    str = String(str);
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength) + "...[截断]";
}

function isWhitelistedString(str) {
    if (!str) return false;
    var lower = String(str).toLowerCase();
    return hookConfig.stringWhitelist.some(function (keyword) {
        return lower === String(keyword).toLowerCase();
    });
}

function isClassNameBlacklisted(className) {
    if (!ENABLE_BLACKLIST) return false;
    if (!className) return true;
    return hookConfig.classBlacklist.some(function (prefix) {
        return className.startsWith(prefix);
    });
}

function isClassBlacklisted(jclass) {
    if (!ENABLE_BLACKLIST) return false;
    if (!jclass || jclass.isNull()) return true;

    try {
        var env = Java.vm.getEnv();
        var className = env.getClassName(jclass);
        return isClassNameBlacklisted(className);
    } catch (e) {
        return true;
    }
}

function shouldPrintMethod(info) {
    if (!info) return false;

    if (METHOD_NAME_WHITELIST.length > 0) {
        if (METHOD_NAME_WHITELIST.indexOf(info.methodName) < 0) {
            return false;
        }
    }

    if (RETURN_SIGNATURE_WHITELIST.length > 0) {
        var retSig = getReturnSignature(info.signature);
        if (RETURN_SIGNATURE_WHITELIST.indexOf(retSig) < 0) {
            // Lxxx/xxx; 对象返回，如果允许 Ljava/lang/Object; 则放行
            if (!(retSig.charAt(0) === "L" && RETURN_SIGNATURE_WHITELIST.indexOf("Ljava/lang/Object;") >= 0)) {
                return false;
            }
        }
    }

    return true;
}

function getReturnSignature(methodSig) {
    if (!methodSig) return "";
    var p = methodSig.indexOf(")");
    if (p < 0) return "";
    return methodSig.substring(p + 1);
}

function normalizeClassName(name) {
    if (!name) return name;
    if (name.charAt(0) === "L" && name.charAt(name.length - 1) === ";") {
        name = name.substring(1, name.length - 1);
    }
    return name.replace(/\//g, ".");
}

function decodeJString(jstr) {
    if (!jstr || jstr.isNull()) {
        return "null";
    }

    try {
        var JString = Java.use("java.lang.String");
        return Java.cast(jstr, JString).toString();
    } catch (e) {
        try {
            var env = Java.vm.getEnv();
            var cstr = env.getStringUtfChars(jstr, null);
            if (!cstr || cstr.isNull()) return "null";

            var s = cstr.readCString();
            env.releaseStringUtfChars(jstr, cstr);
            return s;
        } catch (e2) {
            return jstr + " <decode string failed: " + e2 + ">";
        }
    }
}

function decodeJObject(jobj, sig) {
    if (!jobj || jobj.isNull()) {
        return "null";
    }

    try {
        if (sig === "Ljava/lang/String;") {
            return decodeJString(jobj);
        }

        var className = normalizeClassName(sig);
        if (className && className !== "Ljava/lang/Object;" && className.indexOf("[") !== 0) {
            try {
                var Klass = Java.use(className);
                return Java.cast(jobj, Klass).toString();
            } catch (e0) {}
        }

        var JObject = Java.use("java.lang.Object");
        return Java.cast(jobj, JObject).toString();
    } catch (e) {
        return jobj + " <object decode failed: " + e + ">";
    }
}

function decodeReturnValue(retval, methodSig, retKind) {
    var retSig = getReturnSignature(methodSig);

    try {
        if (retSig === "V") return "<void>";

        if (retSig === "Ljava/lang/String;") {
            return decodeJString(retval);
        }

        if (retSig === "Z") {
            return retval.toInt32() !== 0;
        }

        if (retSig === "B" || retSig === "C" || retSig === "S" || retSig === "I") {
            return retval.toInt32();
        }

        if (retSig === "J") {
            return retval.toString();
        }

        if (retSig === "F" || retSig === "D") {
            // Frida 对浮点返回值在 NativeCallback/Interceptor 上不总是能直接正确表示。
            // 这里先输出原始值，必要时可用 Java 层 hook 精准拿 float/double。
            return retval.toString();
        }

        if (retSig.charAt(0) === "L") {
            return decodeJObject(retval, retSig);
        }

        if (retSig.charAt(0) === "[") {
            return retval + " <array:" + retSig + ">";
        }

        return retval;
    } catch (e) {
        return retval + " <decode ret failed: " + e + ">";
    }
}

function printMethodReturn(title, tid, info, value) {
    console.log("\n┌─── [" + title + "] [TID:" + tid + "]");
    console.log("│    🎯 方法: " + info.className + "->" + info.methodName + info.signature);
    console.log("│    ✅ 返回: " + truncateString(String(value), MAX_STRING_LENGTH));
    console.log("└──────────────────────────────────────────\n");
}

function hookObjectMethodSymbols(symbols, targetMethodIDs) {
    symbols.forEach(function (sym) {
        try {
            Interceptor.attach(ptr(sym.address), {
                onEnter: function (args) {
                    this._skip = true;
                    this._tid = Process.getCurrentThreadId();
                    this._jmethodID = args[2];

                    if (!this._jmethodID || this._jmethodID.isNull()) return;

                    var info = targetMethodIDs.get(this._jmethodID.toString());
                    if (!info) return;
                    if (!PRINT_OBJECT_RETURN) return;
                    if (getReturnSignature(info.signature) === "V") return;
                    if (!shouldPrintMethod(info)) return;

                    this._methodInfo = info;
                    this._skip = false;
                },

                onLeave: function (retval) {
                    if (this._skip) return;
                    if (!this._methodInfo) return;

                    var info = this._methodInfo;
                    var value = decodeReturnValue(retval, info.signature, "object");
                    printMethodReturn("对象方法返回", this._tid, info, value);
                }
            });
            console.log("[+] Hook " + sym.name + " @ " + sym.address);
        } catch (e) {
            console.log("[!] Hook object method failed: " + sym.name + " " + e);
        }
    });
}

function hookStaticObjectMethodSymbols(symbols, targetMethodIDs) {
    symbols.forEach(function (sym) {
        try {
            Interceptor.attach(ptr(sym.address), {
                onEnter: function (args) {
                    this._skip = true;
                    this._tid = Process.getCurrentThreadId();
                    this._jmethodID = args[2];

                    if (!this._jmethodID || this._jmethodID.isNull()) return;

                    var info = targetMethodIDs.get(this._jmethodID.toString());
                    if (!info) return;
                    if (!PRINT_OBJECT_RETURN) return;
                    if (getReturnSignature(info.signature) === "V") return;
                    if (!shouldPrintMethod(info)) return;

                    this._methodInfo = info;
                    this._skip = false;
                },

                onLeave: function (retval) {
                    if (this._skip) return;
                    if (!this._methodInfo) return;

                    var info = this._methodInfo;
                    var value = decodeReturnValue(retval, info.signature, "object");
                    printMethodReturn("静态对象方法返回", this._tid, info, value);
                }
            });
            console.log("[+] Hook " + sym.name + " @ " + sym.address);
        } catch (e) {
            console.log("[!] Hook static object method failed: " + sym.name + " " + e);
        }
    });
}

function hookPrimitiveMethodSymbols(symbols, targetMethodIDs, typeName, isStatic) {
    symbols.forEach(function (sym) {
        try {
            Interceptor.attach(ptr(sym.address), {
                onEnter: function (args) {
                    this._skip = true;
                    this._tid = Process.getCurrentThreadId();
                    this._jmethodID = args[2];

                    if (!this._jmethodID || this._jmethodID.isNull()) return;

                    var info = targetMethodIDs.get(this._jmethodID.toString());
                    if (!info) return;
                    if (!PRINT_PRIMITIVE_RETURN) return;
                    if (getReturnSignature(info.signature) === "V") return;
                    if (!shouldPrintMethod(info)) return;

                    this._methodInfo = info;
                    this._skip = false;
                },

                onLeave: function (retval) {
                    if (this._skip) return;
                    if (!this._methodInfo) return;

                    var info = this._methodInfo;
                    var value = decodeReturnValue(retval, info.signature, typeName);
                    printMethodReturn((isStatic ? "静态" : "") + typeName + "方法返回", this._tid, info, value);
                }
            });
            console.log("[+] Hook " + sym.name + " @ " + sym.address);
        } catch (e) {
            console.log("[!] Hook primitive method failed: " + sym.name + " " + e);
        }
    });
}

function hookFieldGetter(addr, typeName, isStatic, fieldMap) {
    if (!addr) return;

    try {
        Interceptor.attach(ptr(addr), {
            onEnter: function (args) {
                this._skip = true;
                this._typeName = typeName;
                this._isStatic = isStatic;
                this._tid = Process.getCurrentThreadId();
                this._fieldID = args[2];

                if (!this._fieldID || this._fieldID.isNull()) return;

                this._fieldInfo = fieldMap.get(this._fieldID.toString());
                if (!this._fieldInfo) return;

                this._skip = false;
            },

            onLeave: function (retval) {
                if (this._skip) return;
                if (!this._fieldInfo) return;

                var value = "";

                try {
                    if (this._typeName === "boolean") {
                        value = retval.toInt32() !== 0;
                    } else if (this._typeName === "byte") {
                        value = retval.toInt32();
                    } else if (this._typeName === "char") {
                        value = "0x" + retval.toInt32().toString(16);
                    } else if (this._typeName === "short") {
                        value = retval.toInt32();
                    } else if (this._typeName === "int") {
                        value = retval.toInt32();
                    } else if (this._typeName === "long") {
                        value = retval.toString();
                    } else if (this._typeName === "float") {
                        value = retval.toString();
                    } else if (this._typeName === "double") {
                        value = retval.toString();
                    } else if (this._typeName === "object") {
                        value = decodeJObject(retval, this._fieldInfo.signature);
                    } else {
                        value = retval;
                    }
                } catch (e) {
                    value = retval + " <parse error: " + e + ">";
                }

                console.log("\n┌─── [" + (this._isStatic ? "读取静态字段" : "读取字段") + "] [TID:" + this._tid + "]");
                console.log("│    📎 字段: " + this._fieldInfo.className + "." + this._fieldInfo.fieldName + ":" + this._fieldInfo.signature);
                console.log("│    📦 类型: " + this._typeName);
                console.log("│    ✅ 值: " + truncateString(String(value), MAX_STRING_LENGTH));
                console.log("└──────────────────────────────────────────\n");
            }
        });

        console.log("[+] Hook " + (isStatic ? "GetStatic" : "Get") + typeName + "Field @ " + addr);
    } catch (e) {
        console.log("[!] Hook field getter failed: " + typeName + " " + e);
    }
}

function hookLibart() {
    var targetMethodIDs = new Map();
    var targetFieldIDs = new Map();
    var targetStaticFieldIDs = new Map();

    var libart = Process.findModuleByName("libart.so");
    if (!libart) {
        console.log("[-] libart.so not found");
        return;
    }

    var symbols = libart.enumerateSymbols();

    var getStringUTFCharsAddr = null;
    var findClassAddr = null;
    var getMethodIDAddr = null;
    var getStaticMethodIDAddr = null;
    var getFieldIDAddr = null;
    var getStaticFieldIDAddr = null;
    var registerNativesAddr = null;
    var callVoidMethodSymbols = [];

    var callObjectMethodSymbols = [];
    var callStaticObjectMethodSymbols = [];

    var primitiveMethodSymbols = {
        boolean: [],
        byte: [],
        char: [],
        short: [],
        int: [],
        long: [],
        float: [],
        double: []
    };

    var staticPrimitiveMethodSymbols = {
        boolean: [],
        byte: [],
        char: [],
        short: [],
        int: [],
        long: [],
        float: [],
        double: []
    };

    var getFieldAddrs = {
        boolean: null,
        byte: null,
        char: null,
        short: null,
        int: null,
        long: null,
        float: null,
        double: null,
        object: null
    };

    var getStaticFieldAddrs = {
        boolean: null,
        byte: null,
        char: null,
        short: null,
        int: null,
        long: null,
        float: null,
        double: null,
        object: null
    };

    symbols.forEach(function (symbol) {
        var name = symbol.name;

        if (name.indexOf("JNI") < 0) return;
        if (name.indexOf("CheckJNI") >= 0) return;
        // 不要过滤 __va_list；Unity/NDK 很多调用会走 Call<Type>MethodV。
        // 如果过滤掉它，就只能看到 GetMethodID，看不到 getPackageName/getString 等返回值。
        // if (name.indexOf("__va_list") >= 0) return;

        if (name.indexOf("GetStringUTFChars") >= 0) {
            getStringUTFCharsAddr = symbol.address;
        } else if (name.indexOf("FindClass") >= 0) {
            findClassAddr = symbol.address;
        } else if (name.indexOf("GetStaticMethodID") >= 0) {
            getStaticMethodIDAddr = symbol.address;
        } else if (name.indexOf("GetMethodID") >= 0) {
            getMethodIDAddr = symbol.address;
        } else if (name.indexOf("GetStaticFieldID") >= 0) {
            getStaticFieldIDAddr = symbol.address;
        } else if (name.indexOf("GetFieldID") >= 0) {
            getFieldIDAddr = symbol.address;
        } else if (name.indexOf("RegisterNatives") >= 0) {
            registerNativesAddr = symbol.address;
        } else if (name.indexOf("CallStaticObjectMethod") >= 0) {
            callStaticObjectMethodSymbols.push(symbol);
        } else if (name.indexOf("CallObjectMethod") >= 0) {
            callObjectMethodSymbols.push(symbol);
        } else if (name.indexOf("CallVoidMethod") >= 0) {
            callVoidMethodSymbols.push(symbol);
        } else if (name.indexOf("CallStaticBooleanMethod") >= 0) {
            staticPrimitiveMethodSymbols.boolean.push(symbol);
        } else if (name.indexOf("CallStaticByteMethod") >= 0) {
            staticPrimitiveMethodSymbols.byte.push(symbol);
        } else if (name.indexOf("CallStaticCharMethod") >= 0) {
            staticPrimitiveMethodSymbols.char.push(symbol);
        } else if (name.indexOf("CallStaticShortMethod") >= 0) {
            staticPrimitiveMethodSymbols.short.push(symbol);
        } else if (name.indexOf("CallStaticIntMethod") >= 0) {
            staticPrimitiveMethodSymbols.int.push(symbol);
        } else if (name.indexOf("CallStaticLongMethod") >= 0) {
            staticPrimitiveMethodSymbols.long.push(symbol);
        } else if (name.indexOf("CallStaticFloatMethod") >= 0) {
            staticPrimitiveMethodSymbols.float.push(symbol);
        } else if (name.indexOf("CallStaticDoubleMethod") >= 0) {
            staticPrimitiveMethodSymbols.double.push(symbol);
        } else if (name.indexOf("CallBooleanMethod") >= 0) {
            primitiveMethodSymbols.boolean.push(symbol);
        } else if (name.indexOf("CallByteMethod") >= 0) {
            primitiveMethodSymbols.byte.push(symbol);
        } else if (name.indexOf("CallCharMethod") >= 0) {
            primitiveMethodSymbols.char.push(symbol);
        } else if (name.indexOf("CallShortMethod") >= 0) {
            primitiveMethodSymbols.short.push(symbol);
        } else if (name.indexOf("CallIntMethod") >= 0) {
            primitiveMethodSymbols.int.push(symbol);
        } else if (name.indexOf("CallLongMethod") >= 0) {
            primitiveMethodSymbols.long.push(symbol);
        } else if (name.indexOf("CallFloatMethod") >= 0) {
            primitiveMethodSymbols.float.push(symbol);
        } else if (name.indexOf("CallDoubleMethod") >= 0) {
            primitiveMethodSymbols.double.push(symbol);
        } else if (name.indexOf("GetStaticBooleanField") >= 0) {
            getStaticFieldAddrs.boolean = symbol.address;
        } else if (name.indexOf("GetStaticByteField") >= 0) {
            getStaticFieldAddrs.byte = symbol.address;
        } else if (name.indexOf("GetStaticCharField") >= 0) {
            getStaticFieldAddrs.char = symbol.address;
        } else if (name.indexOf("GetStaticShortField") >= 0) {
            getStaticFieldAddrs.short = symbol.address;
        } else if (name.indexOf("GetStaticIntField") >= 0) {
            getStaticFieldAddrs.int = symbol.address;
        } else if (name.indexOf("GetStaticLongField") >= 0) {
            getStaticFieldAddrs.long = symbol.address;
        } else if (name.indexOf("GetStaticFloatField") >= 0) {
            getStaticFieldAddrs.float = symbol.address;
        } else if (name.indexOf("GetStaticDoubleField") >= 0) {
            getStaticFieldAddrs.double = symbol.address;
        } else if (name.indexOf("GetStaticObjectField") >= 0) {
            getStaticFieldAddrs.object = symbol.address;
        } else if (name.indexOf("GetBooleanField") >= 0 && name.indexOf("GetStatic") < 0) {
            getFieldAddrs.boolean = symbol.address;
        } else if (name.indexOf("GetByteField") >= 0 && name.indexOf("GetStatic") < 0) {
            getFieldAddrs.byte = symbol.address;
        } else if (name.indexOf("GetCharField") >= 0 && name.indexOf("GetStatic") < 0) {
            getFieldAddrs.char = symbol.address;
        } else if (name.indexOf("GetShortField") >= 0 && name.indexOf("GetStatic") < 0) {
            getFieldAddrs.short = symbol.address;
        } else if (name.indexOf("GetIntField") >= 0 && name.indexOf("GetStatic") < 0) {
            getFieldAddrs.int = symbol.address;
        } else if (name.indexOf("GetLongField") >= 0 && name.indexOf("GetStatic") < 0) {
            getFieldAddrs.long = symbol.address;
        } else if (name.indexOf("GetFloatField") >= 0 && name.indexOf("GetStatic") < 0) {
            getFieldAddrs.float = symbol.address;
        } else if (name.indexOf("GetDoubleField") >= 0 && name.indexOf("GetStatic") < 0) {
            getFieldAddrs.double = symbol.address;
        } else if (name.indexOf("GetObjectField") >= 0 && name.indexOf("GetStatic") < 0) {
            getFieldAddrs.object = symbol.address;
        }
    });

    Object.keys(getFieldAddrs).forEach(function (k) {
        hookFieldGetter(getFieldAddrs[k], k, false, targetFieldIDs);
    });

    Object.keys(getStaticFieldAddrs).forEach(function (k) {
        hookFieldGetter(getStaticFieldAddrs[k], k, true, targetStaticFieldIDs);
    });

    hookObjectMethodSymbols(callObjectMethodSymbols, targetMethodIDs);
    hookStaticObjectMethodSymbols(callStaticObjectMethodSymbols, targetMethodIDs);

    Object.keys(primitiveMethodSymbols).forEach(function (k) {
        hookPrimitiveMethodSymbols(primitiveMethodSymbols[k], targetMethodIDs, k, false);
    });

    Object.keys(staticPrimitiveMethodSymbols).forEach(function (k) {
        hookPrimitiveMethodSymbols(staticPrimitiveMethodSymbols[k], targetMethodIDs, k, true);
    });

    if (callVoidMethodSymbols.length > 0 && PRINT_VOID_CALL) {
        callVoidMethodSymbols.forEach(function (sym) {
            try {
                Interceptor.attach(ptr(sym.address), {
                    onEnter: function (args) {
                        this._skip = true;
                        var jmethodID = args[2];
                        if (!jmethodID || jmethodID.isNull()) return;

                        var info = targetMethodIDs.get(jmethodID.toString());
                        if (!info) return;

                        this._skip = false;
                        console.log("\n┌─── [Void方法调用] [TID:" + Process.getCurrentThreadId() + "]");
                        console.log("│    🎯 方法: " + info.className + "->" + info.methodName + info.signature);
                        console.log("└──────────────────────────────────────────\n");
                    },
                    onLeave: function (retval) {}
                });
                console.log("[+] Hook " + sym.name + " @ " + sym.address);
            } catch (e) {
                console.log("[!] Hook void method failed: " + sym.name + " " + e);
            }
        });
    }

    if (getStringUTFCharsAddr) {
        try {
            Interceptor.attach(ptr(getStringUTFCharsAddr), {
                onEnter: function (args) {},
                onLeave: function (retval) {
                    if (!retval || retval.isNull()) return;

                    try {
                        var str = retval.readCString();
                        if (!str) return;

                        if (str.indexOf(".") > -1 && str.length > 5) return;

                        if (ENABLE_BLACKLIST) {
                            for (var i = 0; i < hookConfig.stringBlacklist.length; i++) {
                                if (str.indexOf(hookConfig.stringBlacklist[i]) > -1) {
                                    return;
                                }
                            }
                        }

                        console.log("[GetStringUTFChars] [TID:" + Process.getCurrentThreadId() + "] : " + truncateString(str, MAX_STRING_LENGTH));
                    } catch (e) {}
                }
            });
            console.log("[+] Hook GetStringUTFChars @ " + getStringUTFCharsAddr);
        } catch (e) {
            console.log("[!] Hook GetStringUTFChars failed: " + e);
        }
    }

    var allNewStringUTFSymbols = symbols.filter(function (s) {
        return s.name.indexOf("NewStringUTF") >= 0 && s.name.indexOf("CheckJNI") < 0;
    });

    allNewStringUTFSymbols.forEach(function (sym) {
        try {
            Interceptor.attach(ptr(sym.address), {
                onEnter: function (args) {
                    var cstrPtr = args[1];
                    if (!cstrPtr || cstrPtr.isNull()) return;

                    var s = null;
                    try {
                        s = cstrPtr.readUtf8String();
                    } catch (e) {
                        return;
                    }

                    if (!s) return;

                    if (isWhitelistedString(s)) {
                        console.log("\n┌─── [⭐白名单UTF字符串] [TID:" + Process.getCurrentThreadId() + "]");
                        console.log("│      UTF-8字符串: \"" + truncateString(s, MAX_STRING_LENGTH) + "\"");
                        console.log("└──────────────────────────────────────────\n");
                    }
                },
                onLeave: function (retval) {}
            });
        } catch (e) {}
    });

    if (findClassAddr) {
        try {
            Interceptor.attach(ptr(findClassAddr), {
                onEnter: function (args) {
                    if (!args[1] || args[1].isNull()) return;

                    var name = "";
                    try {
                        name = args[1].readCString();
                    } catch (e) {
                        return;
                    }

                    if (isClassNameBlacklisted(name)) return;

                    var stackTraceMsg = Thread.backtrace(this.context, Backtracer.ACCURATE)
                        .slice(1)
                        .map(DebugSymbol.fromAddress)
                        .join("\n");

                    console.log("\n┌─── [查找类] [TID:" + Process.getCurrentThreadId() + "]");
                    console.log("│    🔍 类名: " + truncateString(name, MAX_STRING_LENGTH));
                    console.log("│    📄 堆栈跟踪:");
                    console.log("│    " + truncateString(stackTraceMsg.replace(/\n/g, "\n│    "), MAX_STRING_LENGTH * 3));
                    console.log("└──────────────────────────────────────────\n");
                },
                onLeave: function (retval) {}
            });
            console.log("[+] Hook FindClass @ " + findClassAddr);
        } catch (e) {
            console.log("[!] Hook FindClass failed: " + e);
        }
    }

    if (getMethodIDAddr) {
        Interceptor.attach(ptr(getMethodIDAddr), {
            onEnter: function (args) {
                this._skip = true;
                this._jclass = args[1];

                if (!this._jclass || this._jclass.isNull()) return;
                if (isClassBlacklisted(this._jclass)) return;

                try {
                    this._methodName = args[2].readCString();
                    this._methodSig = args[3].readCString();
                    this._className = Java.vm.getEnv().getClassName(this._jclass);
                    this._tid = Process.getCurrentThreadId();
                    this._skip = false;

                    if (PRINT_METHOD_ID_LOG) {
                        console.log("\n┌─── [获取方法ID] [TID:" + this._tid + "]");
                        console.log("│    🎯 类->方法: " + truncateString(this._className + "->" + this._methodName + this._methodSig, MAX_STRING_LENGTH));
                        console.log("└──────────────────────────────────────────\n");
                    }
                } catch (e) {
                    this._skip = true;
                }
            },

            onLeave: function (retval) {
                if (this._skip) return;
                if (!retval || retval.isNull()) return;

                targetMethodIDs.set(retval.toString(), {
                    className: this._className,
                    methodName: this._methodName,
                    signature: this._methodSig,
                    isStatic: false
                });
            }
        });
        console.log("[+] Hook GetMethodID @ " + getMethodIDAddr);
    }

    if (getStaticMethodIDAddr) {
        Interceptor.attach(ptr(getStaticMethodIDAddr), {
            onEnter: function (args) {
                this._skip = true;
                this._jclass = args[1];

                if (!this._jclass || this._jclass.isNull()) return;
                if (isClassBlacklisted(this._jclass)) return;

                try {
                    this._methodName = args[2].readCString();
                    this._methodSig = args[3].readCString();
                    this._className = Java.vm.getEnv().getClassName(this._jclass);
                    this._tid = Process.getCurrentThreadId();
                    this._skip = false;

                    if (PRINT_METHOD_ID_LOG) {
                        console.log("\n┌─── [获取静态方法ID] [TID:" + this._tid + "]");
                        console.log("│    🎯 类->方法: " + truncateString(this._className + "->" + this._methodName + this._methodSig, MAX_STRING_LENGTH));
                        console.log("└──────────────────────────────────────────\n");
                    }
                } catch (e) {
                    this._skip = true;
                }
            },

            onLeave: function (retval) {
                if (this._skip) return;
                if (!retval || retval.isNull()) return;

                targetMethodIDs.set(retval.toString(), {
                    className: this._className,
                    methodName: this._methodName,
                    signature: this._methodSig,
                    isStatic: true
                });
            }
        });
        console.log("[+] Hook GetStaticMethodID @ " + getStaticMethodIDAddr);
    }

    if (getFieldIDAddr) {
        Interceptor.attach(ptr(getFieldIDAddr), {
            onEnter: function (args) {
                this._skip = true;
                this._jclass = args[1];

                if (!this._jclass || this._jclass.isNull()) return;
                if (isClassBlacklisted(this._jclass)) return;

                try {
                    this._fieldName = args[2].readCString();
                    this._fieldSig = args[3].readCString();
                    this._className = Java.vm.getEnv().getClassName(this._jclass);
                    this._tid = Process.getCurrentThreadId();
                    this._skip = false;

                    if (PRINT_FIELD_ID_LOG) {
                        console.log("\n┌─── [获取字段ID] [TID:" + this._tid + "]");
                        console.log("│    📎 类.字段: " + truncateString(this._className + "." + this._fieldName + ":" + this._fieldSig, MAX_STRING_LENGTH));
                        console.log("└──────────────────────────────────────────\n");
                    }
                } catch (e) {
                    this._skip = true;
                }
            },

            onLeave: function (retval) {
                if (this._skip) return;
                if (!retval || retval.isNull()) return;

                targetFieldIDs.set(retval.toString(), {
                    className: this._className,
                    fieldName: this._fieldName,
                    signature: this._fieldSig,
                    isStatic: false
                });
            }
        });
        console.log("[+] Hook GetFieldID @ " + getFieldIDAddr);
    }

    if (getStaticFieldIDAddr) {
        Interceptor.attach(ptr(getStaticFieldIDAddr), {
            onEnter: function (args) {
                this._skip = true;
                this._jclass = args[1];

                if (!this._jclass || this._jclass.isNull()) return;
                if (isClassBlacklisted(this._jclass)) return;

                try {
                    this._fieldName = args[2].readCString();
                    this._fieldSig = args[3].readCString();
                    this._className = Java.vm.getEnv().getClassName(this._jclass);
                    this._tid = Process.getCurrentThreadId();
                    this._skip = false;

                    if (PRINT_FIELD_ID_LOG) {
                        console.log("\n┌─── [获取静态字段ID] [TID:" + this._tid + "]");
                        console.log("│    📎 类.字段: " + truncateString(this._className + "." + this._fieldName + ":" + this._fieldSig, MAX_STRING_LENGTH));
                        console.log("└──────────────────────────────────────────\n");
                    }
                } catch (e) {
                    this._skip = true;
                }
            },

            onLeave: function (retval) {
                if (this._skip) return;
                if (!retval || retval.isNull()) return;

                targetStaticFieldIDs.set(retval.toString(), {
                    className: this._className,
                    fieldName: this._fieldName,
                    signature: this._fieldSig,
                    isStatic: true
                });
            }
        });
        console.log("[+] Hook GetStaticFieldID @ " + getStaticFieldIDAddr);
    }

    if (registerNativesAddr) {
        try {
            Interceptor.attach(ptr(registerNativesAddr), {
                onEnter: function (args) {
                    var java_class = args[1];
                    var methods_ptr = ptr(args[2]);
                    var method_count = parseInt(args[3]);

                    if (!java_class || java_class.isNull()) return;
                    if (!methods_ptr || methods_ptr.isNull()) return;
                    if (!method_count || method_count <= 0) return;

                    var class_name = "";
                    try {
                        class_name = Java.vm.tryGetEnv().getClassName(java_class);
                    } catch (e) {
                        class_name = String(java_class);
                    }

                    console.log("\n╔═══ [注册本地方法] [TID:" + Process.getCurrentThreadId() + "] ═══╗");
                    console.log("║    🏛️  类: " + truncateString(class_name, MAX_STRING_LENGTH));
                    console.log("║    📊 方法数量: " + method_count);
                    console.log("╠════════════════════════════════════════════╣");

                    for (var i = 0; i < method_count; i++) {
                        try {
                            var base = methods_ptr.add(i * Process.pointerSize * 3);
                            var name_ptr = base.readPointer();
                            var sig_ptr = base.add(Process.pointerSize).readPointer();
                            var fnPtr_ptr = base.add(Process.pointerSize * 2).readPointer();

                            var name = name_ptr.readCString();
                            var sig = sig_ptr.readCString();
                            var find_module = Process.findModuleByAddress(fnPtr_ptr);

                            console.log("║    🔧 方法: " + truncateString(name, MAX_STRING_LENGTH));
                            console.log("║       └─ 签名: " + truncateString(sig, MAX_STRING_LENGTH));
                            console.log("║       └─ 地址: " + fnPtr_ptr);
                            if (find_module) {
                                console.log("║       └─ 模块: " + find_module.name + " (偏移: " + ptr(fnPtr_ptr).sub(find_module.base) + ")");
                            } else {
                                console.log("║       └─ 模块: <unknown>");
                            }

                            if (i < method_count - 1) {
                                console.log("║    ────────────────────────────────────────");
                            }
                        } catch (e) {
                            console.log("║    [!] parse method[" + i + "] failed: " + e);
                        }
                    }
                    console.log("╚════════════════════════════════════════════╝\n");
                },
                onLeave: function (retval) {}
            });
            console.log("[+] Hook RegisterNatives @ " + registerNativesAddr);
        } catch (e) {
            console.log("[!] Hook RegisterNatives failed: " + e);
        }
    }

    console.log("[*] simple_jnitrace Frida 17.9 ready, including Call<Type>MethodV symbols");
}

Java.perform(function () {
    hookLibart();
});