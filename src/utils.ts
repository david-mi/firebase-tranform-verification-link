export function transformVerifyLink(verifyLink: string) {
  checkVerifyLink(verifyLink)

  const oobCode = getOobCodeFromVerifyLink(verifyLink)
  return createCustomVerificationLink(oobCode)
}

function getOobCodeFromVerifyLink(verifyLink: string) {
  const oobCodeRegex = /(?<=oobCode=)(.+)(?=&apiKey)/;

  return verifyLink.match(oobCodeRegex)![0]
}

function createCustomVerificationLink(oobCode: string) {
  const msnVerificationLinkUrl = "http://localhost:5173/verify-account"

  const customVerificationUrl = new URL(msnVerificationLinkUrl)
  customVerificationUrl.searchParams.append("oobCode", oobCode)

  return customVerificationUrl.href
}

function checkVerifyLink(verifyLink: string) {
  const isVerifyLink = verifyLink.startsWith("http://127.0.0.1:9099/emulator/action?mode=verifyEmail")

  if (isVerifyLink === false) {
    throw new Error("Ce n'est pas un lien de vérification")
  }
}

export async function setLinkToClipboard(link: string) {
  return navigator.clipboard.writeText(link)
}