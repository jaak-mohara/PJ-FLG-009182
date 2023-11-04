import { Change, EventContext, firestore } from 'firebase-functions';

exports.reflectUpdates = firestore.document('feature_flags/{flagId}')
    .onWrite((
      change: Change<firestore.DocumentSnapshot>,
      context: EventContext<{ flagId: string }>
    ) => {
    const changeData = change.after.data();
     
    return admin.database()
      .ref(`/feature_flags/${changeData?.uuid}`)
      .set({
        name: changeData?.name,
        isEnabled: changeData?.isEnabled
      });
  }
);