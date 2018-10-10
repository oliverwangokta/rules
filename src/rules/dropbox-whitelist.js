/**
 * @title Whitelist on the cloud
 * @overview Determine access to users based on a whitelist of emails stored in Dropbox.
 * @gallery true
 * @category access control
 *
 * This rule denies/grant access to users based on a list of emails stored in Dropbox.
 *
 */

function (user, context, callback) {
  request.get({
    url: 'https://dl.dropboxusercontent.com/u/12345678/email_list.txt'
  }, (err, response, body) => {
    const whitelist = body.split('\n');

    const userHasAccess = whitelist.some(function (email) {
      return email === user.email;
    });

    if (!userHasAccess) {
      return callback(new UnauthorizedError('Access denied.'));
    }

    callback(null, user, context);
  });
}
