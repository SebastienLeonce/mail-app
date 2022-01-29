import { MailModel, Mail } from "@mail-app/model";

export default () => {
    return async (id: Mail["_id"], cb : (arg0: Mail | null) => void) => {
        const doc = await MailModel.findById(id)

        cb(doc ? doc : null)
    };
}