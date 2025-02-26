import Realm from 'realm';

class BookSchema extends Realm.Object {
  static schema = {
    primaryKey: 'id',
    name: 'Book',
    properties: {
      title: 'string',
      id: 'string',
      author: 'string',
      category: 'string',
      page: 'string',
      rating: 'string',
      bookImage: 'string',
    },
  };
}

const realm = new Realm({
  schema: [BookSchema],
  schemaVersion: 2,
  migration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 2) {
      const oldBooks = oldRealm.objects('Book');
      const newBooks = newRealm.objects('Book');

      for (let i = 0; i < oldBooks.length; i++) {
        newBooks[i].page = String(oldBooks[i].page);
        newBooks[i].rating = String(oldBooks[i].rating);
      }
    }
  },
});

export default realm;
