import React, { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { firestore } from '@/firebase-app/firebase-auth'

const Notifications = () => {
  const [notifications, setNotifications] = useState<any>([])

  useEffect(() => {
    const notificationsRef = collection(firestore, 'notifications')
    const unsubscribe = onSnapshot(notificationsRef, (snapshot) => {
      const newNotifications: any = []
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          newNotifications.push({ id: change.doc.id, ...change.doc.data() })
        }
      })
      setNotifications((prevNotifications: any) => [...prevNotifications, ...newNotifications])
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  return (
    <div>
      <h2>Realtime Notifications</h2>
      <ul>
        {notifications.map((notification: any) => (
          <li key={notification.id}>{notification.message}</li>
        ))}
      </ul>
    </div>
  )
}

export default Notifications
