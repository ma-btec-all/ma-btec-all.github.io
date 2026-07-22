import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User as UserIcon, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import maLogo from "@/assets/ma-btec-logo.png";

const signupSchema = z.object({
  displayName: z.string().trim().min(2, "الاسم قصير جداً").max(80, "الاسم طويل جداً"),
  email: z.string().trim().email("البريد الإلكتروني غير صحيح").max(255),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل").max(72),
});

const loginSchema = z.object({
  email: z.string().trim().email("البريد الإلكتروني غير صحيح").max(255),
  password: z.string().min(1, "أدخل كلمة المرور").max(72),
});

const AuthPage = () => {
  const [params, setParams] = useSearchParams();
  const initialMode = params.get("mode") === "signup" ? "signup" : "login";
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  useEffect(() => {
    setMode(params.get("mode") === "signup" ? "signup" : "login");
  }, [params]);

  const isLogin = mode === "login";

  const switchMode = (next: "login" | "signup") => {
    setMode(next);
    setParams({ mode: next });
  };

  const ensureProfile = async (userId: string, name?: string) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .upsert(
          { user_id: userId, display_name: name || null },
          { onConflict: "user_id", ignoreDuplicates: false }
        );
      if (error) {
        console.error("[ensureProfile] upsert failed:", error.message, error.details, error.hint, error.code);
      }
    } catch (e) {
      console.error("[ensureProfile] exception:", e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const parsed = loginSchema.safeParse({ email, password });
        if (!parsed.success) throw new Error(parsed.error.errors[0].message);
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (data.user) await ensureProfile(data.user.id, data.user.user_metadata?.display_name);
        navigate("/dashboard");
      } else {
        const parsed = signupSchema.safeParse({ email, password, displayName });
        if (!parsed.success) throw new Error(parsed.error.errors[0].message);
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: displayName, full_name: displayName },
            emailRedirectTo: `${window.location.origin}/dashboard`,
          },
        });
        if (error) {
          console.error("[signUp] auth error:", error);
          throw error;
        }
        if (data.user) await ensureProfile(data.user.id, displayName);
        toast({
          title: "تم إنشاء الحساب بنجاح! 🎉",
          description: "تحقق من بريدك الإلكتروني لتأكيد الحساب",
        });
      }
    } catch (error: any) {
      console.error("[auth] failure:", error);
      const msg = error?.message || "حدث خطأ غير متوقع";
      const detail = error?.details || error?.hint || error?.code;
      toast({
        title: "خطأ في المصادقة",
        description: detail ? `${msg} — ${detail}` : msg,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: "google" | "apple") => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          // تعديل الرابط ليصبح ديناميكياً
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) {
        toast({
          title: "تعذّر تسجيل الدخول",
          description: error.message || "حدث خطأ غير متوقع",
          variant: "destructive",
        });
        return;
      }
    } catch (err: any) {
      toast({ title: "خطأ", description: err.message, variant: "destructive" });
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10 relative overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at top, hsl(260 50% 14%), hsl(225 40% 7%) 60%, hsl(225 45% 5%))",
        fontFamily: "Cairo, sans-serif",
        direction: "rtl",
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: "hsl(265 85% 55% / 0.18)" }} />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: "hsl(220 90% 55% / 0.16)" }} />
      </div>

      <Link to="/" className="absolute top-5 right-5 text-white/70 hover:text-white text-sm flex items-center gap-1.5 z-20">
        <ArrowLeft className="w-4 h-4" /> العودة للرئيسية
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div
          className="rounded-2xl p-7 sm:p-8 backdrop-blur-2xl"
          style={{
            background: "linear-gradient(160deg, hsl(225 35% 11% / 0.85), hsl(260 40% 13% / 0.85))",
            border: "1px solid hsl(var(--primary) / 0.25)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.55), 0 0 40px hsl(265 80% 55% / 0.15)",
          }}
        >
          <div className="flex flex-col items-center text-center mb-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3"
              style={{
                background: "linear-gradient(135deg, hsl(220 80% 18%), hsl(260 60% 18%))",
                border: "1px solid hsl(var(--primary) / 0.4)",
                boxShadow: "0 0 24px hsl(265 80% 55% / 0.35)",
              }}
            >
              <img src={maLogo} alt="MA BTEC" className="w-12 h-12 object-contain" />
            </div>
            <h1 className="text-2xl font-extrabold text-white">
              {isLogin ? "مرحباً بعودتك" : "أنشئ حسابك واستمتع بجميع المزايا"}
            </h1>
            <p className="text-xs text-white/60 mt-1.5">
              {isLogin ? "سجّل دخولك للمتابعة إلى Mohammad Atallah | BTEC" : "انضم لمنصة BTEC التعليمية الآن"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1.5">
                <Label className="text-xs text-white/80 font-semibold">الاسم الكامل</Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <Input
                    placeholder="أدخل اسمك الكامل"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="h-11 bg-black/30 border-white/10 text-white placeholder:text-white/30 text-right pl-10"
                    required
                    maxLength={80}
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <Label className="text-xs text-white/80 font-semibold">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <Input
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 bg-black/30 border-white/10 text-white placeholder:text-white/30 text-right pl-10"
                  required
                  maxLength={255}
                  dir="ltr"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-white/80 font-semibold">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 bg-black/30 border-white/10 text-white placeholder:text-white/30 text-right pl-10 pr-10"
                  required
                  minLength={6}
                  maxLength={72}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 text-sm font-bold text-white border-0 hover:opacity-90 transition-opacity"
              style={{
                background: "linear-gradient(135deg, hsl(220 90% 60%), hsl(265 85% 62%))",
                boxShadow: "0 8px 24px hsl(240 80% 55% / 0.45)",
              }}
            >
              {loading ? "جاري التحميل..." : isLogin ? "تسجيل الدخول ←" : "إنشاء حساب ←"}
            </Button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] text-white/40 uppercase tracking-wider">أو</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              onClick={() => handleOAuth("google")}
              className="h-11 text-sm font-semibold text-white border border-white/10 hover:bg-white/5 transition-colors"
              style={{ background: "hsl(225 35% 12% / 0.6)" }}
            >
              <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5c1.6 0 3 .55 4.1 1.6l3-3C17.2 1.9 14.8 1 12 1 7.4 1 3.4 3.6 1.4 7.4l3.5 2.7C5.9 7.1 8.7 5 12 5z"/>
                <path fill="#4285F4" d="M23 12c0-.8-.1-1.6-.2-2.3H12v4.5h6.2c-.3 1.4-1.1 2.6-2.3 3.4l3.5 2.7c2.1-1.9 3.6-4.8 3.6-8.3z"/>
                <path fill="#FBBC05" d="M4.9 14.3c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3L1.4 7C.5 8.5 0 10.2 0 12s.5 3.5 1.4 5l3.5-2.7z"/>
                <path fill="#34A853" d="M12 23c3.2 0 5.9-1.1 7.9-2.9l-3.5-2.7c-1 .7-2.3 1.1-4.4 1.1-3.3 0-6.1-2.1-7.1-5.1L1.4 16C3.4 20.4 7.4 23 12 23z"/>
              </svg>
              Google
            </Button>
            <Button
              type="button"
              onClick={() => handleOAuth("apple")}
              className="h-11 text-sm font-semibold text-white border border-white/10 hover:bg-white/5 transition-colors"
              style={{ background: "hsl(225 35% 12% / 0.6)" }}
            >
              <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Apple
            </Button>
          </div>



          <div className="mt-6 text-center text-xs text-white/70">
            {isLogin ? (
              <>
                ليس لديك حساب؟{" "}
                <button
                  onClick={() => switchMode("signup")}
                  className="text-primary hover:underline font-bold"
                  style={{ color: "hsl(220 90% 65%)" }}
                >
                  إنشاء حساب جديد
                </button>
              </>
            ) : (
              <>
                لديك حساب بالفعل؟{" "}
                <button
                  onClick={() => switchMode("login")}
                  className="text-primary hover:underline font-bold"
                  style={{ color: "hsl(220 90% 65%)" }}
                >
                  تسجيل الدخول
                </button>
              </>
            )}
          </div>

          <p className="mt-4 text-center text-[10px] text-white/40 leading-relaxed">
            {isLogin ? "بتسجيل دخولك" : "بإنشاء حسابك"}، أنت توافق على شروط الخدمة وسياسة الخصوصية
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;