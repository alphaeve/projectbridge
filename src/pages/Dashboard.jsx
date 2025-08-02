// Common Dashboard with Modern UI Enhancements
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDoc,
  doc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [role, setRole] = useState(null);
  const [applications, setApplications] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectMap, setProjectMap] = useState({});
  const [notePopup, setNotePopup] = useState({ open: false, appId: null });
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user?.uid) return;
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();
      setRole((userData?.role || "developer").toLowerCase());
    };
    fetchUserRole();
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.email || !role) return;

      const allProjectSnap = await getDocs(collection(db, "projects"));
      const map = {};
      allProjectSnap.docs.forEach(doc => {
        map[doc.id] = doc.data().title;
      });
      setProjectMap(map);

      if (role === "client") {
        const projectSnapshot = await getDocs(
          query(collection(db, "projects"), where("email", "==", user.email))
        );
        const userProjects = projectSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProjects(userProjects);

        const projectIds = userProjects.map(p => p.id);
        if (projectIds.length > 0) {
          const appsSnapshot = await getDocs(collection(db, "applications"));
          const allApps = appsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          const filtered = allApps.filter(app => projectIds.includes(app.projectId));
          setApplications(filtered);
        }
      } else {
        const appSnapshot = await getDocs(
          query(collection(db, "applications"), where("appliedBy", "==", user.email))
        );
        const devApps = appSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setApplications(devApps);
      }
    };
    fetchData();
  }, [user, role]);

  const updateStatus = async (appId, status) => {
    if (status === "accepted") {
      setNotePopup({ open: true, appId });
    } else {
      await updateDoc(doc(db, "applications", appId), { status });
      setApplications(prev => prev.map(app => app.id === appId ? { ...app, status } : app));
    }
  };

  const submitNote = async () => {
    const { appId } = notePopup;
    await updateDoc(doc(db, "applications", appId), {
      status: "accepted",
      clientNote: noteText,
    });
    setApplications(prev =>
      prev.map(app =>
        app.id === appId ? { ...app, status: "accepted", clientNote: noteText } : app
      )
    );
    setNotePopup({ open: false, appId: null });
    setNoteText("");
  };

  const deleteApplication = async (appId) => {
    await deleteDoc(doc(db, "applications", appId));
    setApplications(prev => prev.filter(app => app.id !== appId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-blue-700 mb-8">📊 Dashboard</h2>

        {role === "client" ? (
          <>
            <h3 className="text-2xl font-semibold mb-4">📬 Applications to Your Projects</h3>
            {applications.length === 0 ? (
              <p className="text-gray-500">No applications yet.</p>
            ) : (
              <div className="grid gap-6">
                {applications.map(app => (
                  <div key={app.id} className="bg-white border border-blue-100 p-5 rounded-xl shadow hover:shadow-md transition">
                    <div className="text-lg font-medium text-blue-900 mb-2">📁 {projectMap[app.projectId] || app.projectId}</div>
                    <p><span className="font-semibold">👤 Applicant:</span> {app.appliedBy}</p>
                    {/* <p><span className="font-semibold">💰 Price:</span> ₹{app.price}</p> */}
                    <p><span className="font-semibold">⏱️ Time(Days):</span> {app.time}</p>
                    <p><span className="font-semibold">💬 Message:</span> {app.message}</p>
                    <p><span className="font-semibold">📌 Status:</span> <span className={`font-semibold ${app.status === 'accepted' ? 'text-green-600' : 'text-yellow-600'}`}>{app.status || "pending"}</span></p>
                    {app.clientNote && (
                      <p><span className="font-semibold">📝 Note Sent:</span> {app.clientNote}</p>
                    )}
                    <div className="mt-3 flex gap-4">
                      <button onClick={() => updateStatus(app.id, "accepted")} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">✅ Accept</button>
                      <button onClick={() => updateStatus(app.id, "rejected")} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">❌ Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : role === "developer" ? (
          <>
            <h3 className="text-2xl font-semibold mb-4">📌 Your Applications</h3>
            {applications.length === 0 ? (
              <p className="text-gray-500">You haven't applied to any projects yet.</p>
            ) : (
              <div className="grid gap-6">
                {applications.map(app => (
                  <div key={app.id} className="bg-white border border-gray-200 p-5 rounded-xl shadow hover:shadow-md transition">
                    <div className="text-lg font-medium text-blue-800 mb-2">📁 {projectMap[app.projectId] || app.projectId}</div>
                    <p><span className="font-semibold">⏱️ Time:</span> {app.time}</p>
                    <p><span className="font-semibold">💬 Message:</span> {app.message}</p>
                    <p><span className="font-semibold">📌 Status:</span> <span className={`font-semibold ${app.status === 'accepted' ? 'text-green-600' : 'text-yellow-600'}`}>{app.status || "pending"}</span></p>
                    {app.clientNote && (
                      <p><span className="font-semibold">📝 Client Note:</span> {app.clientNote}</p>
                    )}
                    <div className="mt-3">
                      <button onClick={() => deleteApplication(app.id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">🗑 Withdraw</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-500">Loading your dashboard...</p>
        )}

        {/* 📝 Note Modal */}
        {notePopup.open && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
              <h3 className="text-xl font-bold mb-4 text-blue-700">💌 Add Note to Developer</h3>
              <textarea
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write a message for the developer..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              ></textarea>
              <div className="mt-4 flex justify-end gap-3">
                <button
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                  onClick={() => setNotePopup({ open: false, appId: null })}
                >Cancel</button>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={submitNote}
                >Send Note</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
