/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Sends email using Sendgrid.
 *
 * @param secret the secret for the sendmail service
 * @param from_email the from email address
 * @param from_name optional from name
 * @param to_email the to email address
 * @param to_name optionaal to name
 * @param subject optional subject for the email
 * @param content the body of the email
 **/
function main(args) {
    if (!args.from_email) {
        return { error: 'missing from email' }
    } else if (!args.to_email) {
        return { error: 'missing to email' }
    } else if (!args.secret) {
        return { error: 'missing secret' }
    }

    let mailer = require('sendgrid')(args.secret.split(':')[0], args.secret.split(':')[1])
    let email = new mailer.Email();
    email.addTo(args.to_email, args.to_name || '')
    email.setFrom(args.from_email, args.from_name || '')
    email.setSubject(args.subject || '')
    email.setText(args.content || '')

    return new Promise(function(resolve, reject) {
        mailer.send(email, (error, response) => {
            if(error) {
                console.log('error in sg', error.response)
                reject({error: error.message}) 
            } else {
                console.log('email sent')
                resolve({response: response})
            }
        })
    })
}

exports.main = main
