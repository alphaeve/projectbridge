import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionEnd, setSubscriptionEnd] = useState(null);

  const login = ({ username, email, role }) => {
    const userData = { username, email, role };
    setUser(userData);
    localStorage.setItem("projectBridgeUser", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("projectBridgeUser");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const data = userDoc.data();

          const now = new Date();
          const end = data.subscriptionEnd ? new Date(data.subscriptionEnd) : null;
          const isSubActive = data.subscribed && end && now < end;

          // 🟡 Auto-disable expired subscriptions
          if (data.subscribed && end && now > end) {
            await updateDoc(userDocRef, { subscribed: false });
          }

          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            username: data.username,
            role: data.role,
            subscribed: isSubActive,
            subscriptionStart: data.subscriptionStart,
            subscriptionEnd: data.subscriptionEnd,
          });

          setIsSubscribed(isSubActive);
          setSubscriptionEnd(data.subscriptionEnd);
        }
      } else {
        setUser(null);
        setIsSubscribed(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isSubscribed,
        subscriptionEnd,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);



//subscription


// import React, { createContext, useContext, useState, useEffect } from "react";
// import { auth, db } from "../firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ✅ Add login method
//   const login = ({ username, email, role }) => {
//     const userData = { username, email, role };
//     setUser(userData);
//     localStorage.setItem("projectBridgeUser", JSON.stringify(userData)); // Optional
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("projectBridgeUser");
//   };

//   // 🚀 Sync with Firebase Auth
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       if (currentUser) {
//         const userDoc = await getDoc(doc(db, "users", currentUser.uid));
//         if (userDoc.exists()) {
//           const userData = userDoc.data();
//           setUser({
//             uid: currentUser.uid,
//             email: currentUser.email,
//             username: userData.username,
//             role: userData.role,
//           });
//         }
//       } else {
//         setUser(null);
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
