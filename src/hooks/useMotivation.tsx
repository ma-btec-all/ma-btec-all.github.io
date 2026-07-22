import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface MotivationContextType {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
}

const MotivationContext = createContext<MotivationContextType>({
  enabled: true,
  setEnabled: () => {},
});

const LS_KEY = "btec-motivation-enabled";

export const MotivationProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [enabled, setEnabledState] = useState<boolean>(() => {
    const v = localStorage.getItem(LS_KEY);
    return v === null ? true : v === "1";
  });

  // Load preference from profile when user logs in
  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("motivation_enabled")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data && typeof (data as any).motivation_enabled === "boolean") {
          const v = (data as any).motivation_enabled as boolean;
          setEnabledState(v);
          localStorage.setItem(LS_KEY, v ? "1" : "0");
        }
      });
  }, [user]);

  const setEnabled = useCallback(
    (v: boolean) => {
      setEnabledState(v);
      localStorage.setItem(LS_KEY, v ? "1" : "0");
      if (user) {
        supabase
          .from("profiles")
          .update({ motivation_enabled: v } as any)
          .eq("user_id", user.id)
          .then(() => {});
      }
    },
    [user],
  );

  return (
    <MotivationContext.Provider value={{ enabled, setEnabled }}>
      {children}
    </MotivationContext.Provider>
  );
};

export const useMotivation = () => useContext(MotivationContext);
