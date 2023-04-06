'use strict';

const models = {
    UserModel: require('./user'),
    AuthModel: require('./auth'),
    PostModel: require('./post')
};

const relations = {
    'fk_auth_user_id': 'ALTER TABLE auth ADD CONSTRAINT fk_auth_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE',
    'fk_post_user_id': 'ALTER TABLE posts ADD CONSTRAINT fk_post_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE'
}

const constraintExists = async(constraintName, db) => {
    let checkQuery = `SELECT COUNT(*) FROM information_schema.constraint_column_usage where constraint_name = '${constraintName}';`
    const isExist = await db.query(checkQuery);
    return isExist.rows[0].count;
}


exports.init = async(db) => {
    if (db) {
        for (let model in models) {
            await models[model].init(db);
        }
        for (let relation in relations) {
            const isExists = await constraintExists(relation, db);
            if (!(+isExists)) {
                await db.query(relations[relation]);
            }
        }
    }

}

