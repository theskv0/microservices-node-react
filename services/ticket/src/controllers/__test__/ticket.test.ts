import { Types } from "mongoose";
import Ticket from "../../models/ticket.model";

it("Ticket: success - optimistic concurrency control", async () => {
  const ticket = await Ticket.create({
    title: "Test",
    price: 10.5,
    user: new Types.ObjectId(),
  });
  //   expect(ticket.__v).toEqual(0);
  ticket.title = "Test 1";
  await ticket.save();
  await Ticket.updateOne({ _id: ticket._id }, { $set: { title: "Test 2" } });
  const ticket2 = await Ticket.findById(ticket.id);
  console.log(ticket2);
});
