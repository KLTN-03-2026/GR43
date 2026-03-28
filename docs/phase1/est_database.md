
Phase 1 : Core System

users :
{
  "_id": "ObjectId",
  "username": "string",
  "email": "string",
  "passwordHash": "string",
  "authProvider": "string", // 'local', 'google', 'apple'
  "status": "string", // 'active', 'banned', 'deleted'
  "role": "string", // 'user', 'admin'
  "lastLoginAt": "ISODate",
  "createdAt": "ISODate",
  "deletedAt": "ISODate"
}


users_session :
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "deviceId": "string",
  "fcmToken": "string",
  "ipAddress": "string",
  "userAgent": "string",

  "e2ee_keys": {
    "identityKey": "string",
    "signedPreKey": "string",
    "signature": "string"
  },
  "isValid": "boolean",
  "lastSeenAt": "ISODate",
  "createdAt": "ISODate"
}
db.users_session.createIndex({ userId: 1 })
db.users_session.createIndex({ createdAt: 1 }, { expireAfterSeconds: 2592000 }) // TTL 30 ngày


user_profiles :
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "basic_info": {
    "displayName": "string",
    "dob": "ISODate",
    "gender": "string", // 'Male', 'Female', 'Other'
    "languages": ["string"] // 'Vietnamese', 'English', 'Chinese', 'Japanese', 'Korean', 'French', 'Spanish', 'German', 'Italian', 'Portuguese', 'Russian', 'Arabic', 'Other'
  },
  "background": {
    "education": "string", // 'High School', 'University', 'Master', 'PhD'
    "occupation": "string" // 'Student', 'Engineer', 'Doctor', 'Teacher', 'Other'
  },
  "lifestyle": {
    "drinking": "string", // 'Yes', 'No', 'Socially'
    "smoking": "string", // 'Yes', 'No', 'Socially'
    "socialLevel": "string", // 'Go out', 'Stay at home'
    "personalityType": "string",
    "loveLanguage": ["string"], // 'Words of Affirmation', 'Acts of Service', 'Receiving Gifts', 'Quality Time', 'Physical Touch'
    "hobbies": ["string"],
    "interests": ["string"] // 'Music', 'Movies', 'Sports', 'Travel', 'Food', 'Books', 'Gaming', 'Fashion', 'Art', 'Photography', 'Other'
  },
  "dating_style": {
    "freeTimePrefer": ["string"],
    "dateStyle": ["string"]
  },
  "updatedAt": "ISODate"
}

user_photos :
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "url": "string",
  "order": "int",
  "isPrimary": "boolean",
  "createdAt": "ISODate"
}
db.user_photos.createIndex({ userId: 1 })

user_preferences :
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "ageRange": { "min": "int", "max": "int" },
  "gender": ["string"], // 'Male', 'Female', 'Other'
  "maxDistance": "int", // km
  "languages": ["string"], // 'Vietnamese', 'English', 'Chinese', 'Japanese', 'Korean', 'French', 'Spanish', 'German', 'Italian', 'Portuguese', 'Russian', 'Arabic', 'Other'
  "hobbies": ["string"],
  "interests": ["string"],
  "updatedAt": "ISODate"
}

user_verifications :
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "phone": {
    "number": "string",
    "isVerified": "boolean",
    "verifiedAt": "ISODate"
  },
  "email": {
    "address": "string",
    "isVerified": "boolean",
    "verifiedAt": "ISODate"
  },
  "faceId": {
    "isVerified": "boolean",
    "verifiedAt": "ISODate",
    "faceVector": "string"
  },
  "idCard": {
    "isVerified": "boolean",
    "verifiedAt": "ISODate",
    "frontImageUrl": "string",
    "backImageUrl": "string"
  },
  "updatedAt": "ISODate"
}

user_locations :
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "location": {
    "type": "Point",
    "coordinates": ["longitude", "latitude"]
  },
  "lastActiveAt": "ISODate",
  "updatedAt": "ISODate"
}
Index bắt buộc: Đánh index 2dsphere vào field location để dùng query $geoNear tìm người xung quanh cực nhanh.
db.user_locations.createIndex({ location: "2dsphere" })
db.user_locations.createIndex({ userId: 1 })
db.user_locations.createIndex({ lastActiveAt: -1 })


user_settings :
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "notifications": {
    "match": "boolean",
    "message": "boolean",
    "call": "boolean",
    "system": "boolean"
  },
  "privacy": {
    "showOnlineStatus": "boolean",
    "showLocation": "boolean",
    "showActivity": "boolean"
  },
  "safety": {
    "safeMode": "boolean",
    "emergencyContact": "string",
    "emergencyLocation": {
      "type": "Point",
      "coordinates": ["longitude", "latitude"]
    }
  },
  "updatedAt": "ISODate"
}

swipe :
{
  "_id": "ObjectId",
  "actorId": "ObjectId",
  "targetId": "ObjectId",
  "action": "string", // like / pass
  "isMutual": "boolean", // NEW
  "createdAt": "ISODate"
}
db.swipe.createIndex({ actorId: 1, targetId: 1 }, { unique: true })
db.swipe.createIndex({ createdAt: -1 })
db.swipe.createIndex({ targetId: 1 })

matches :
{
  "_id": "ObjectId",
  "users": ["ObjectId", "ObjectId"], // sorted
  "createdAt": "ISODate",
  "lastMessageAt": "ISODate"
}
db.matches.createIndex({ users: 1 })
db.matches.createIndex({ lastMessageAt: -1 })

// If not E2EE
messsage : {
  "_id": "ObjectId",
  "conversationId": "ObjectId",
  "senderId": "ObjectId",
  "content": "string",
  "createdAt": "ISODate"
}

// If E2EE
message :
{
  "_id": "ObjectId",
  "conversationId": "ObjectId",
  "senderId": "ObjectId",
  "senderDeviceId": "string", // Rất quan trọng để biết thiết bị nào gửi
  "type": "number", // 1: Text, 2: Image (Image cũng phải mã hóa E2EE trước khi upload lên S3)
  "ciphertext": "string", // Nội dung đã bị mã hóa (Base64)
  "nonce": "string", // Initialization Vector (IV) bắt buộc phải có để giải mã
  "isDelivered": "boolean",
  "isRead": "boolean",
  "createdAt": "ISODate"
}

callsessions :
{
  "_id": "ObjectId",
  "matchId": "ObjectId", // Rất quan trọng: Chỉ cho phép gọi khi đã Match
  "callerId": "ObjectId",
  "receiverId": "ObjectId",
  "callType": "string", // 'audio', 'video'
  "status": "string", // 'initiating', 'ringing', 'ongoing', 'completed', 'missed', 'rejected'
  "startedAt": "ISODate", // Thời điểm receiver bấm 'accept'
  "endedAt": "ISODate", // Thời điểm 1 trong 2 user bấm 'end'
  "createdAt": "ISODate" // Thời điểm caller bấm gọi
}
