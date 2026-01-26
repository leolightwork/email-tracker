let idSet = 1;
export const emails = [];

export const getEmails = () => {
  return emails;
};

export const deleteEmails = (id) => {
  const index = emails.findIndex((e) => e.id === id);

  if (index === -1) return false;
  emails.splice(index, 1);
  return true;
};

//Local Method
export const setEmails = (email) => {
  const emailLoad = { id: idSet++, ...email };
  emails.push(emailLoad);
  return emailLoad;
};