
import React, { useState } from 'react';
import {
  View,
  Text,
 FlatList,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';

import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';





const fetchPosts = async (userId) => {
  let url = 'https://jsonplaceholder.typicode.com/posts';

  if (userId !== '') {
    url += `?userId=${Number(userId)}`;
  }
 

  const response = await fetch(url);
  return response.json();
};

const createPost = async (newPost) => {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    }
  );

  return response.json();
};

const updatePost = async (updatedPost) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPost),
    }
  );

  return response.json();
};

const patchPost = async (patchedPost) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${patchedPost.id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: patchedPost.title,
      }),
    }
  );

  return response.json();
};

const deletePost = async (id) => {
  await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      method: 'DELETE',
    }
  );

  return id;
};

export default function HomeScreen() {
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState('');
  console.log('User ID:', userId);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['posts', userId],
    queryFn: () => fetchPosts(userId),  
  });

  
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      });
    },
  });

  const patchMutation = useMutation({
    mutationFn: patchPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      });
    },
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Posts</Text>

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Body"
        value={body}
        onChangeText={setBody}
        style={styles.input}
      />

      <Button
        title="Create Post"
        onPress={() => {
          mutation.mutate({
            title,
            body,
            userId: 1,
          });

          setTitle('');
          setBody('');
        }}
      />
      <TextInput
  placeholder="Filter by User ID (e.g. 1)"
  value={userId}
  onChangeText={setUserId}
  keyboardType="numeric"
  style={styles.input}
/>

      <FlatList
        data={data}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={styles.title}>
              {item.title}
            </Text>

            <Text>{item.body}</Text>

            <Button
              title="Edit"
              onPress={() => {
                updateMutation.mutate({
                  id: item.id,
                  title: 'Updated Title',
                  body: 'Updated Body',
                  userId: item.userId,
                });
              }}
            />

            <Button
              title="Patch Title"
              onPress={() => {
                patchMutation.mutate({
                  id: item.id,
                  title: 'Patched Title',
                });
              }}
            />

<Button
  title="Delete"
  onPress={() => {
    deleteMutation.mutate(item.id);
  }}
/>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    padding: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  post: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },

  title: {
    fontWeight: 'bold',
    marginBottom: 5,
  },

  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});