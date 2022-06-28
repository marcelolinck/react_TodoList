import firebase from 'firebase';
import "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCmzsyjhviVaO-Q0mskFmLxrEJjNdO8kxI",
  authDomain: "yttodoapp-1637a.firebaseapp.com",
  projectId: "yttodoapp-1637a",
  storageBucket: "yttodoapp-1637a.appspot.com",
  messagingSenderId: "259253570394",
  appId: "1:259253570394:web:574549db7067a648bec163"
}
class Fire {
    constructor(callback){
        this.init(callback);
    }
    init(callback){
        
        if(!firebase.apps.length){
            firebase.initializeApp(firebaseConfig)
        }
        firebase.auth().onAuthStateChanged(user =>{
            if(user){
                callback(null, user);
            }else{
                firebase
                    .auth()
                    .signInAnonymously()
                    .catch(error=>{
                        callback(error);
                    })
            }
        })

        
    }
    getLists(callback){
        let ref = this.ref.orderBy('name');
        
        this.unsubscribe = ref.onSnapshot(snapshot =>{
            lists = []
            snapshot.forEach(doc => {
                lists.push({id: doc.id, ...doc.data()})
            })

            callback(lists);

        })
    }

    addList(list){
        let ref = this.ref;
        ref.add(list);

    }
    updateList(list){
        let ref = this.ref;

        ref.doc(list.id).update(list);
    }

    get userId(){
        return firebase.auth().currentUser.uid
    }

    get ref(){
        return firebase
        .firestore()
        .collection('users')
        .doc(this.userId)
        .collection("lists");
    }

    detach(){
        this.unsubscribe();
    }

}

export default Fire;