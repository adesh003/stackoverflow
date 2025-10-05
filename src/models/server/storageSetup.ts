import { Permission } from "node-appwrite";
import { questionAttachmentBucket } from "../name";
import { storage } from "./config";

export default async function getOrCreateStorage() {
    try {
        // Try to get the bucket first
        const bucket = await storage.getBucket(questionAttachmentBucket);
        console.log("Storage bucket already exists");
        return bucket;
    } catch (error: any) {
        if (error.code === 404) {
            console.log("Bucket not found - attempting to create a new one...");
            try {
                // First, list all buckets to see if we can reuse one
                const buckets = await storage.listBuckets();
                
                // Check if we have any existing buckets we can use
                if (buckets.buckets.length > 0) {
                    console.log(`Found ${buckets.buckets.length} existing buckets. Using the first one.`);
                    return buckets.buckets[0];
                }

                // If no buckets exist, try to create one
                console.log("No existing buckets found. Creating a new one...");
                const bucket = await storage.createBucket(
                    questionAttachmentBucket,
                    questionAttachmentBucket,
                    [
                        Permission.read('any'),
                        Permission.read('users'),
                        Permission.create('users'),
                        Permission.update('users'),
                        Permission.delete('users'),
                    ],
                    false,
                    undefined,
                    undefined,
                    ["jpg", "png", "jpeg", "gif", "webp", "svg", "heic"]
                );
                console.log("Storage bucket created successfully");
                return bucket;
            } catch (createError: any) {
                if (createError.code === 'storage_bucket_limit_exceeded') {
                    console.error("Error: You've reached the maximum number of storage buckets in your Appwrite plan.");
                    console.error("Please either:");
                    console.error("1. Delete unused buckets from your Appwrite console");
                    console.error("2. Upgrade your Appwrite plan");
                    console.error("3. Use an existing bucket if available");
                    
                    // Try to use the first available bucket if any exist
                    const buckets = await storage.listBuckets();
                    if (buckets.buckets.length > 0) {
                        console.log(`Using existing bucket: ${buckets.buckets[0].name}`);
                        return buckets.buckets[0];
                    }
                    
                    throw new Error('No buckets available and cannot create new ones. Please check your Appwrite plan.');
                }
                console.error("Failed to create storage bucket:", createError.message);
                throw createError;
            }
        } else {
            console.error("Error accessing storage:", error.message);
            throw error;
        }
    }
}



// import { Permission } from "node-appwrite";
// import { questipnAttachmentBucket } from "../name";
// import { storage } from "./config";

// export default async function getOrCreateStorage() {
//   try {
//     await storage.getBucket(questipnAttachmentBucket);
//     console.log("✅ Storage bucket connected");
//   } catch (error) {
//     if (error.code === 404) {
//       console.log("⚠️ Bucket not found — creating one...");
//       try {
//         await storage.createBucket(
//           questipnAttachmentBucket,
//           questipnAttachmentBucket,
//           [
//             Permission.read("any"),
//             Permission.read("users"),
//             Permission.create("users"),
//             Permission.update("users"),
//             Permission.delete("users"),
//           ],
//           false,
//           undefined,
//           undefined,
//           ["jpg", "png", "jpeg", "gif", "webp", "svg", "heic"]
//         );
//         console.log("✅ Storage bucket created successfully");
//       } catch (createError) {
//         if (createError.code === 409) {
//           console.log("ℹ️ Bucket already exists — continuing...");
//         } else {
//           console.error("❌ Failed to create bucket:", createError.message);
//         }
//       }
//     } else {
//       console.error("❌ Failed to connect to storage:", error.message);
//     }
//   }
// }
