import React, {useState, createContext} from 'react';

const UserContext = createContext();

const UserProvider = props => {
  const [id, setId] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  return (
    <UserContext.Provider
      value={{
        id,
        fname,
        lname,
        email,
        phone,
        address,
        password,
        setId,
        setFname,
        setLname,
        setEmail,
        setPhone,
        setAddress,
        setPassword,
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export {UserContext, UserProvider};
