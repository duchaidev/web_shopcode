import React, { useState, useEffect } from 'react'
import { collection, addDoc, onSnapshot, query, orderBy, where } from 'firebase/firestore'
import { firestore } from '@/firebase-app/firebase-auth'

const RealtimeFirebase = () => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    const q = query(collection(firestore, 'messages'), where('recipientId', '==', '1'), orderBy('timestamp'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData: any = []
      snapshot.forEach((doc) => messagesData.push({ ...doc.data(), id: doc.id }))
      setMessages(messagesData)
    })

    return () => unsubscribe()
  }, [])

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      await addDoc(collection(firestore, 'messages'), {
        text: newMessage,
        timestamp: new Date(),
        recipientId: '1',
        senderId: '2'
      })
      setNewMessage('')
    }
  }

  console.log(messages)

  return (
    <div>
      <h2>Realtime RealtimeFirebase</h2>
      <div>
        {messages.map((message: any) => (
          <div key={message.id}>{message.text}</div>
        ))}
      </div>
      <input type='text' value={newMessage} className='border' onChange={(e) => setNewMessage(e.target.value)} />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  )
}

export default RealtimeFirebase
