import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotifications } from '../redux/notificationslice';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const Notification = () => {
  const { notifications } = useSelector(store => store.notifications);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white p-4 pt-24 flex flex-col items-center">
      <div className="w-full max-w-xl bg-[#0f0f0f] rounded-xl px-6 py-6 shadow-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-white">Notifications</h1>
          <Button onClick={() => navigate(-1)} className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Back
          </Button>
        </div>

        {/* Clear All */}
        {notifications.length > 0 && (
          <div className="flex justify-end mb-4">
            <Button
              onClick={() => dispatch(clearNotifications())}
              className="bg-gray-800 hover:bg-gray-700 text-sm px-4 py-1"
            >
              Clear All
            </Button>
          </div>
        )}

        {/* Notification List */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {notifications.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No notifications yet.</div>
          ) : (
            notifications.map((notif, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 bg-[#1a1a1a] px-4 py-3 rounded-lg"
              >
                <div
                  className={`w-2 h-2 rounded-full mt-1 ${
                    notif.type === 'like'
                      ? 'bg-pink-500'
                      : notif.type === 'follow'
                      ? 'bg-blue-500'
                      : 'bg-gray-400'
                  }`}
                ></div>
                <p className="text-sm text-gray-300">{notif.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
