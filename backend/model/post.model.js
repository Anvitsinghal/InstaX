import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  caption: { type: String, default: '' },
  image: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true });

export const Post = mongoose.model('Post', postSchema);
/*author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
This means:

author will store the User’s ID

But ref: 'User' tells Mongoose:
➝ “This ID belongs to the User model” */
//example->
//const post = await Post.findById(postId).populate("author");

//!######################################################################################################################################
/*Imagine you order a pizza:

Your order (like Post) has:

pizzaName: Margherita

customerId: 12345678 ← This is the ID of the customer who ordered it

But if you want to know who ordered it (their name, phone, address), you need to look into the Customers collection.

🍃 In MongoDB & Mongoose
You have:

🧍 User model

{ _id: "u123", username: "Anvit", email: "anvit@gmail.com" }
📝 Post model

{
  _id: "p456",
  caption: "My first post",
  author: "u123" // ← only the User ID is stored here!
}
So by default, post.author is just a string (the ID).

✅ .populate("author") means:
"Hey Mongoose, go to the User collection and replace the author ID with the full user document."

💻 Code Example

const post = await Post.findById("p456").populate("author");
Now the result becomes:

{
  _id: "p456",
  caption: "My first post",
  author: {
    _id: "u123",
    username: "Anvit",
    email: "anvit@gmail.com"
  }
}
You get full user details instead of just the ID.

*/
