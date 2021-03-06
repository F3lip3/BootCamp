const bcrypt = require('bcrypt');

module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            'users',
            [
                {
                    name: 'Administrador',
                    email: 'admin@gympoint.com',
                    password_hash: bcrypt.hashSync('admin', 8),
                    created_at: new Date(),
                    updated_at: new Date()
                }
            ],
            {}
        );
    },
    down: () => {}
};
