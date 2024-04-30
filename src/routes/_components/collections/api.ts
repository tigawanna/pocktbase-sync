import type { PocketBaseClient } from "@/lib/pb/client";

interface LoginAndGetCollections{
pb:PocketBaseClient;
email:string;
password:string;
}

export async function loginAndGetCollections({pb,email,password}: LoginAndGetCollections) {
    await pb.admins.authWithPassword(email, password);
}
