const {Command} = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// const {program} = require("commander");

// program
//   .option("-a, --action, <type>")
//   .option("-i, --id, <type>")
//   .option("-n, --name, <type>")
//   .option("-e, --email, <type>")
//   .option("-p, --phone, <type>");

// program.parse();

// const argv = program.opts();

const contacts = require("./db/contacts");

const invokeAction = async ({action, id, name, email, phone}) => {
  switch (action) {
    case "list":
      const list = await contacts.listContacts();
      console.table(list);
      break;

    case "get":
      const oneContact = await contacts.getContactById(id);
      console.log(oneContact);
      break;

    case "add":
      const newContact = await contacts.addContact({name, email, phone});
      console.log(newContact);
      break;

    case "remove":
      const deleteContact = await contacts.removeContact(id);
      console.log(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
