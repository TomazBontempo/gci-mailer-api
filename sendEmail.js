const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const config = require("./config");

//Send e-mail:

function sendEmail(emailAddress) {
  console.log("Iniciando envio do e-mail");
  const OAuth2 = google.auth.OAuth2;
  const OAuth2_client = new OAuth2(config.clientId, config.clientSecret);
  OAuth2_client.setCredentials({ refresh_token: config.refreshToken });
  const accessToken = OAuth2_client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: config.user,
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      refreshToken: config.refreshToken,
      accessToken: accessToken,
    },
  });

  // Opções do e-mail
  const mailOptions = {
    from: `GCinteligente <$${config.user}>`,
    to: emailAddress,
    subject: "Seu passo a passo reclamação ANATEL chegou.",
    html: get_html_message(),
    attachments: [
      {
        filename: "ppra.pdf",
        path: "./ppra.pdf",
      },
    ],
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("E-mail enviado: " + info.response);
    }
  });
}

function get_html_message() {
  return `
  <body  style="background-image: url(https://lh3.googleusercontent.com/EGQx-a3Gzgakiv2SI3_qeNmkh9ZNTD6iqeZ96PwpDQwwDvarLZTyg4jssS6yG76_QWZgBfmHn9i7JNKuniXC-KvHi9O1CAUtl9V5dyuwOWv6UfdhrI1tkHh5c-Lylix510y2owZpvlFcDdvMEVAtFSST7XeJUx9oHESx1oHR0apG4nerBZMeB4kFjC4xmXZtzya3aQ4ROOcjoxDcIUHXp1U1VXucece0W3pwdYMluchha52LvuktXM9p_ygPKs-0Ld8tMGXUQVTTrOlhLPmLGT7ub0oEv39EncUxOsZIQrRplgTYE_NiNl1grIcRWA8fwbY0F-DA0WyzTvLzY5roGviOC8TtwlLK3w8gjIdMh76JeiI1d_UqoYofXHTFactrg0-8S20MxXCJ0SLqppxky4XHj6ZsX96exQ5PG8iNV4p5kZGgbPRYznyEeWMfdx82HhWc_5nncZ-KMA5rdz0riVrflJShN55389_OXmGwr65_sxPJ1gdr2Uq3kzFeuYhZKJ8DzAurEVaQaJomY1Q8Sj1qC1TU1lUV92IZrtbwGwf5iR7X09-J5vMiK9De1jvVwvCEVF3--CrXi0HW5Ojp_QajZRxjzjX2JX8Kf1GT5uuoVGgMexUmH4OLUjoZdTFY1pd2-NYHDJ6QaWCJF4vGkcCsPD8-3dxbusL8XZY4jgshn657xcg_CTaKKf97snl4MC7bzJ2_v6eRAvaNxrCJkSbvm7FoMZUKDGHmEwOIJoVe-hHKPohpRiNSgL2yrgh9aywNtpMuSNEQg7KRZERl0aet_ERa9FeubejaqnWcB7gMnTNsLD4y6tiX-HbS7Duv0KHAEZW3MDfnBsmFruC5_0OAIGIpXXggIVyDpG6xqgJiRiG0LPX-r1_CUn-_DI0gx9FIsZcqcK5s8HCLmz0c4TyEuPL3YZeCkAA4uJ0avzh8Xw=w960-h540-s-no?authuser=0); background-size: 100%; background-repeat: no-repeat">
  <div style="text-align:center; color: white; background-color: rgba(0, 0, 0, 0.9)">
    <img width="500" style="vertical-align: bottom" src="https://lh3.googleusercontent.com/uTer3iraW-hAGAm4HIUiRc3yKbxzN0342_AnriUTYJLonS75flBE6u8NuSMCI72cPVzQ-iUjWHBro9TTSu5_aj44cvWDcxhJsz1Bw5JlP8z5wixt1aW4Mgm966Nd1VLWEggWOuBmsgwpzkOv70FlitdfYq0WnD4T2HpBfAldUao7jn71vQWKiO94CS9ZDMZ5llprVGIopv7eMATcHs9D9ZG96KajlEfYr2SIMWmGzJAZ6D-76YPA5li1wLltZNQCR_1hV89fhMPHj-9UF9G2s8qIIeANYYa5VNvwaM1oRg7Y4tnzZMh6TmLYzCGpwwvcsJCVJbNpPjRParrm6rySrdrcuz-_u8DWJHrEoHg7cF6bwqDSWuVU7mJcmYoAGkE83aqkMBlhKAFP-pV6EllV-b8kNCurAAc9ci9TKAt3b_t7FfNhpDaoYYZwXwJ9IcStwy4i14KEmEW6cK6MekRPhsIJKfaC-1NNb9AApduoiD3q7dH7t8S20ZkvEATxq3PSJ0uZIA86b1Ct9CjkfCycGTrBnuqXevl6ovNDYHS73zNScvv6zHmpkdngDWyuUIdh8F8TxeF8MkvCisWBHnMacJcMfGdtjLdDXIvlKad_KpQ0yRJNlwmIIatsMlzrt1HrvaL9gw-qV9WXWgZqcOJrH5tssNtBFu1F1Z5YMyarXFYolRZg9GYIMS6s0qrd7qojSpmeuFDzSHVlhScFABkIhAx4WBKrGvx2INGlZ1-lZ4czH7XNcKnsUnQMGcDk6dNxmDXP0Eq-bezOnzNP6U6N5K0vzSsyjTSltMIR-3vRTHDd4LlRkQv7ZGjKN-1Z6G9RJjpQHzk3FVv32ck7zJIq3LZaKoUxj0D0I3uGa4pW56504-w3_yM-DIWed2tZ8amQ0xBVHYV7sTbRWZklNamWfrl2m6_z5dVTJRpUjjma509SVA=w1863-h316-s-no?authuser=0"/></br>
    <h1 style="color:#ffd058; font-family: impact;">PARABÉNS, SEU PASSO A PASSO RECLAMAÇÃO ANATEL CHEGOU!</h1>
  </br>
    <p style="font-size: large;">Você acaba de receber uma parte do Guia do consumidor inteligente.</p>
    <p style="font-size: large;">
      Esperamos que com esse passo a passo você resolva de vez seus problemas
      com internet.
    </p>
    <p style="font-size: large;">
      Sabemos que irá gosta do conteúdo, então segue o link para o guia
      completo:
    </p>
    <a style="color:#ffd058" href="https://pay.hotmart.com/Q80361170S?bid=1679003476640"
      >Guia do consumidor inteligente</a
    >
    <div style="width: 50%"></div>
    <img width="250" style="vertical-align: middle" src="https://lh3.googleusercontent.com/D7U2sZphQ7x7lLl1v44P8L8S4FkCeUt0Cou6MV8CAFKD8xIv0-ZD-RfP7GsR5_zjxxk_2w8IZJB1YN-BRZ_vYpJa457ng5CTFn7TEAcOLuVc8AgWcGOBkeqFAxMQsDriZ_x31Sx2z9KsdQEU6Nz27UYDcfp1cf1Rk0m63cP9CmvBa0uhf9XI3oBBDRZmk8LeoouPHj3VmJKaxuAWSGoXJaFq68Gtiy2QdbOry2EqbajMLRFC3KuLN6iRscM8zq-1rrU5HK65XyM2LafXo4uD9C9p3y54ARBBq5wQqJKvZn2z_ozf1DOpoSy9yVX1VaVu1ioSGCvPGn4qwYhwa6iy7BFNPHm4vix_n6uwEKd3OVVwKvnuAt40vtIETHz184ncx4d79Qkabjk3IsDJBrjCg4uL3ZB5UMvZ8LfjvTxmn9k00H4FfU1AQoi7ef_KIxs46EBCqyMRSNc8XGMtJi2iB8lSMx1ceaH2gL3BkzCPzZHVtViChTAr8lcM8ceFNTUV0ie3A3hhmszhgLg794cRrL3icqXSUUFEVZ_6vjIp0kOeNlrFN8oQGMemMmTq_pdS7_LNu8jb1dH2z0RBeitY_KqXpXeNBwtT_p8USoe8cuW9oLJxYpOu0iWT0q2MsE7tjfPkEpetqCtyS9_Bbq_07srdupOvxwQQ-tE0g5FQr6yAOnPWzSHDyBzvYhDErHILNWunw5T0_jq4_2u7YjGzfMZgkpOZV8ltunpFfAP_77Lhk7VriMlj2-tdztrVQDNOJiVfcYULHo_BbtDq15Y9m0Ugq-ksleOiNWiew8zUKJXjri558lXjU0mwm_wKg8xlTdDbDOoSun-SDKM2yQVt9l910-U0J5IyxNvT3zNuxAd1DNhai8erA7nt33t0kZTEnjAyP-hYmaziWWebGjbMai1vcQbfM8ArCbAtjNCGErJ0Hw=w646-h969-s-no?authuser=0"/>
  </div>
</body>
  `;
}

// sendEmail("tomaz.bontempo@gmail.com");

module.exports = sendEmail;
