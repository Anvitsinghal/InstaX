import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: '' },
  bio: { type: String, default: '' },
  gender: { type: String, enum: ['male', 'female'] },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);


/*What is it?
ref: 'Something' means this field is linked to another model.
It tells Mongoose:

"This field is an ID pointing to a document in another collection."

Simple Analogy
If User has a list of posts, we don't store full post content in user data.
We just store Post IDs — like a link.

Example:


posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
This means:

posts is an array of MongoDB ObjectIds

Each ObjectId points to a Post document

Now, using .populate(), you can get full Post data from those IDs.


const user = await User.findById(id).populate("posts");
Similarly:

followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
This is a list of users who follow this user.

Each item is a reference (link) to another User.

 */