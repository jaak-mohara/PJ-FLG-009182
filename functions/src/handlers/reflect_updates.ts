import {Change, firestore} from 'firebase-functions';
import {database} from 'firebase-admin';

/**
 * Function that is triggered by updates written in the Firestore database
 * and wrote the change into the Realtime database.
 */
export default firestore.document('feature_flags/{flagId}')
  .onWrite((
    change: Change<firestore.DocumentSnapshot>
  ) => {
    const changeData = change.after.data();

    return database()
      .ref(`/feature_flags/${changeData?.uuid}`)
      .set({
        name: changeData?.name,
        isEnabled: changeData?.isEnabled,
      });
  });
