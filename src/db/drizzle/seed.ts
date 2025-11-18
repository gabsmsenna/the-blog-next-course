import { JsonPostRepository } from "@/repositories/post/json-post-repository";
import { drizzleDb } from ".";
import { postsTable } from "./schemas";

(async () => {
    const jsonPostRepository = new JsonPostRepository();
    const posts = await jsonPostRepository.findAll();
    
    try {
    await drizzleDb.delete(postsTable);
    await drizzleDb.insert(postsTable).values(posts);
    } catch (error) {
        console.error("Error seeding posts:", error);
    }
})();