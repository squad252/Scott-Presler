/* eslint-disable @typescript-eslint/no-explicit-any */
import { ID, Query } from 'appwrite';
import { client, databases } from '../config/appwrite';

const DID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const CID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const CMID = import.meta.env.VITE_APPWRITE_COLLECTION_ID_MESSAGE;


const LIMIT = 100;

export async function saveUserData(data: {
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  zipcode: string;
  phonenumber: string;
}) {
  return await databases.createDocument(DID!, CID!, ID.unique(), data);
}

export async function sendMessage(data: {
  senderId: string;
  message: string;
  isFromAdmin: boolean;
  userName?: string;
  timesent?: Date,
}) {
  if (!data.timesent) {
    data.timesent = new Date();
  }
  return await databases.createDocument(DID!, CMID!, ID.unique(), data);
}

// export const getAllMessages = async () => {
//   return await databases.listDocuments(DID, CMID);
// };

// export const getAllMessages = async () => {
//   const allMessages: any[] = [];
//   let lastDocId: string | null = null;
//   let hasMore = true;

//   try {
//     while (hasMore) {
//       const queries = [Query.limit(LIMIT)];
//       if (lastDocId) {
//         queries.push(Query.cursorAfter(lastDocId));
//       }

//       const response = await databases.listDocuments(DID, CMID, queries);
//       allMessages.push(...response.documents);

//       if (response.documents.length < LIMIT) {
//         hasMore = false;
//       } else {
//         lastDocId = response.documents[response.documents.length - 1].$id;
//       }
//     }

//     return { documents: allMessages };
//   } catch (error) {
//     console.error("Error fetching all messages:", error);
//     return { documents: [] }; // Always return same shape
//   }
// };

export const getAllMessages = async () => {
  let allDocuments: any[] = [];
  let lastId: string | null = null;
  let hasMore = true;

  try {
    // console.log("Fetching all messages...");
    while (hasMore) {
      const queries = [Query.limit(LIMIT)];
      // console.log(hasMore);
      if (lastId) queries.push(Query.cursorAfter(lastId));
      
      const result = await databases.listDocuments(DID, CMID, queries);
      // console.log(hasMore, lastId);

      const documents = result.documents;
      allDocuments = allDocuments.concat(documents);

      if (documents.length < LIMIT) {
        hasMore = false;
      } else {
        lastId = documents[documents.length - 1].$id;
      }
    }

    return { documents: allDocuments };
  } catch (err) {
    console.error("Error fetching messages:", err);
    return { documents: [] };
  }
};

export const getUserData = async (userId: string) => {
  try {
    return await databases.getDocument(DID!, CID!, userId);
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return null;
  }
};


export const getAllUsers = async () => {
  return await databases.listDocuments(DID!, CID);
};

export async function getAllUsersWithStatus() {
  try {
    const result = await databases.listDocuments(DID, CID);
    return result.documents;
  } catch (error) {
    console.error('Error fetching users:', error);
    return null;
  }
}

export async function updateUserStatus(userId: string, status: 'pending' | 'accepted' | 'declined') {
  try {
    const updateData: any = { status };
    if (status === "accepted") {
      updateData.madepayment = true;
    }
    return await databases.updateDocument(DID, CID, userId, updateData);
  } catch (error) {
    console.error('Error updating user status:', error);
    return null;
  }
}

export async function updateMessage(data: {
  senderId: string,
  message: string,
  isFromAdmin: true,
  userName: string,
  timesent?: Date,
}) {
  if (!data.timesent) {
    data.timesent = new Date();
  }
  return await databases.createDocument(DID!, CMID!, ID.unique(), data);
}

export const subscribeToMessages = (callback: (message: any) => void) => {
  return client.subscribe(
    `databases.${DID}.collections.${CMID}.documents`,
    (response) => {
      if (response.events.includes("databases.*.collections.*.documents.*.create")) {
        callback(response.payload); // This is the new message document
      }
    }
  );
};

export async function getUserStatus(userEmail: string) {
  try {
    const response = await databases.listDocuments(DID, CID, [
      Query.equal('email', userEmail),
      Query.limit(1),
    ]);

    if (response.documents.length > 0) {
      const user = response.documents[0];
      console.log(user.status)
      return user.status ?? null;
    }

    return null;
  } catch (err) {
    console.error('Failed to fetch user status', err);
    return null;
  }
}