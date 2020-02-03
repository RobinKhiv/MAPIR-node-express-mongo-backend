const getDb = require('../utils/database').getDb;

class Task {
  constructor(id, title, isDone){
    this.id = id;
    this.title = title;
    this.isDone = isDone;
  }
  update(){
    const db = getDb();
    return db.collection('tasks')
      .updateOne({ id: this.id }, {$set: this})
      .then()
      .catch(err => console.log(err));
  }
  save() {
    const db = getDb();
    db.collection('tasks')
      .insertOne(this)
      .then()
      .catch(err => console.log(err));
  }
  static fetchAll(){
    const db = getDb();
    return db.collection('tasks').find().toArray()
      .then(tasks => {
        return tasks;
      })
      .catch(err => console.log(err));
  }
  static findById(taskId){
    const db = getDb();
    return db.collection('tasks')
      .find({id: taskId})
      .next()
      .then(task =>  {
        return task;
      })
      .catch(err => console.log(err));
  }
  static deleteById(taskId){
    const db = getDb();
    return db.collection('tasks')
      .deleteOne({id: taskId})
      .then()
      .catch(err => console.log(err));
  }
}

module.exports = Task;