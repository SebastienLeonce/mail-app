import { Mail } from "@mail-app/model";
import { MailModel } from "@models/Mail";

export default () => {
    return async (id: Mail["_id"], cb : (arg0: Mail | null) => void) => {
        const doc = await MailModel.findById(id)

        cb(doc ? doc : null)
    };
}