global class ngAppTest {
    global class Contact {
      public String name;
      public Integer id;
      public Integer score;
      public Contact(String name, Integer id, Integer score) {
        this.name = name;
        this.id = id;
        this.score = score;
      }
    }
    @RemoteAction
    webservice static String getContacts() {
      List<Contact> contacts = new List<Contact>();
      contacts.add(new Contact('Madeleine Black', 11, 22));
      contacts.add(new Contact('Frank Pullman', 12, 15));
      contacts.add(new Contact('Samantha Hill', 13, 12));
      contacts.add(new Contact('Sam Ince', 14, 23));
      contacts.add(new Contact('Joseph Hughes', 15, 22));
      contacts.add(new Contact('Karen Randall', 16, 25));
      contacts.add(new Contact('Benjamin Manning', 17, 30));
      contacts.add(new Contact('Katherine Wright', 18, 17));
      contacts.add(new Contact('Thomas Vance', 19, 12));
      return JSON.serialize(contacts);
    }
}