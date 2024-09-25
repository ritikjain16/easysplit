import mongoose from "mongoose";

const GroupSchema = mongoose.Schema({
  groupName: String,
  names: Array,
  userIds: Array,
  users: Array,
});

const Group = mongoose.model("group", GroupSchema);

export default Group;
