var user = {
    _id: ObjectId(""),
    username: "foo",
    first_name: "bar",
    last_name: "baz",
    user_key: {
        id: "",
        type: "gpg/ssh/etc",
        key_string: "public key string",
        fingerprint: "string"
    },
    userDirs: {
        settings: "$USER/settings",
        files: "$USER/files",
        mail: "$USER/mail"
    },
    joined: "datetime",
    last_login: "datetime",
    account_type: "admin/user/dev/etc"
}