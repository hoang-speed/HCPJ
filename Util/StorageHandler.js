import { AsyncStorage } from 'react-native';

class StorageHandler {
    static async getAsyncStorage(key) {
        try {
            let value = '';
            await AsyncStorage.getItem(key, (err, item) => {
                value = JSON.parse(item);
                console.log(item)
            });
            return value
        }
        catch (e) {
            return e;
        }
    }

    static async setAsyncStorage(key, value) {
        console.log("setStorageKey key ->", key, value);

        return await AsyncStorage.setItem(key, JSON.stringify(value));
    }
}

export default StorageHandler;
