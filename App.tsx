import React, { useEffect, useState } from 'react';
import { Button, View, StyleSheet, SafeAreaView, Text } from 'react-native';

import { Amplify } from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';

import outputs from './amplify_outputs.json';
import { fetchUserAttributes } from 'aws-amplify/auth';

Amplify.configure(outputs);

const SignOutButton: React.FC = () => {
  const { signOut } = useAuthenticator();

  return (
    <View style={styles.signOutButton}>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};

const HomeScreen: React.FC<{ username: string }> = ({ username }) => {
  return (
    <View style={styles.contentContainer}>
      <Text style={styles.welcomeText}>Welcome {username}!</Text>
      <Button title="Search Game" onPress={() => {}} />
    </View>
  );
};

const App: React.FC = () => {
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const fetchUsername = async (): Promise<void> => {
      const userAttributes = await fetchUserAttributes();
      const fetchedUsername = userAttributes?.preferred_username ?? '';
      setUsername(fetchedUsername);
    };
    void fetchUsername();
  }, []);

  return (
    <Authenticator.Provider>
      <Authenticator>
        <SafeAreaView style={styles.container}>
          <SignOutButton />
          <HomeScreen username={username} />
        </SafeAreaView>
      </Authenticator>
    </Authenticator.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  signOutButton: {
    alignSelf: 'flex-end',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
