import firebase from 'firebase';
import "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBwBcuspAWNXMJQMLxIyp4lMoPug0tDsqo",
    authDomain: "yttodoapp-29fbe.firebaseapp.com",
    projectId: "yttodoapp-29fbe",
    storageBucket: "yttodoapp-29fbe.appspot.com",
    messagingSenderId: "797395303207",
    appId: "1:797395303207:web:d3a31fbc64a2c8f1438702"
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
