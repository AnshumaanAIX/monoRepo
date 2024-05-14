import { useEffect, useState } from 'react';
import { Avatar, EmailDisplay, useAfterInitialEffect } from '@pega/cosmos-react-core';
import mockUsers from './mockUsers';
export const getMockUsers = async (limit = 3) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ results: mockUsers.slice(0, limit) });
    }, 500);
  });
};

const getMockListItem = ({
  name: { first: firstName, last: lastName },
  email,
  picture: { thumbnail }
}) => {
  const fullName = `${firstName} ${lastName}`;
  return {
    data: {
      id: email,
      firstName,
      lastName,
      email,
      thumbnail
    },
    id: email,
    primary: fullName,
    contextualLabel: fullName,
    secondary: (
      <div>
        <EmailDisplay value={email} />
      </div>
    ),
    visual: <Avatar size='l' name={fullName} imageSrc={thumbnail} />,
    actions: [{ id: '11', text: 'Delete', icon: 'trash' }]
  };
};

export const useMockListData = (cb, { count } = { count: undefined }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { results } = await getMockUsers(count);
      if (mounted) {
        setItems(results.map(getMockListItem));
      }
    })();
    return () => {
      mounted = false;
    };
  }, [count]);

  useAfterInitialEffect(cb, [items]);

  return [items, setItems];
};
