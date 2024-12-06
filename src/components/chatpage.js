import React, { useEffect, useRef } from "react";
import { Box, Typography, Paper, TextField, Button } from "@mui/material";

const ChatMessages = ({
  currentChat,
  messages,
  userId,
  userInfo,
  message,
  setMessage,
  sendMessage,
})  => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };  
  

  useEffect(() => {
    scrollToBottom();
  }, [messages]); 

  console.log( currentChat,
    +'chatpage')
  return (
    <Box padding={2} flexGrow={1} display="flex" flexDirection="column">
      <Typography variant="h6" gutterBottom>
        Chat with {currentChat?.name || "Select a user or room"}
      </Typography>

      <Paper
        style={{
          flexGrow: 1,
          padding: "10px",
          overflowY: "auto",
          border: "1px solid #ddd",
          height: "400px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {currentChat ? (
          <>
            {messages.map((msg, idx) => {
              const isCurrentUser = msg?.sender_id === userId;
              return (
                <Box
                  key={idx}
                  textAlign={isCurrentUser ? "right" : "left"}
                  marginY={1}
                >
                  <Box
                    style={{
                      display: "inline-block",
                      padding: "10px",
                      borderRadius: "8px",
                      backgroundColor: isCurrentUser ? "#d1f0d1" : "#f1f1f1",
                      maxWidth: "70%",
                    }}
                  >
                    {!isCurrentUser && (
                      <Typography
                        variant="body2"
                        sx={{ fontSize: "12px", color: "red" }}
                      >
                        {msg?.sender_info?.name}
                      </Typography>
                    )}

                    <Typography variant="body2">{msg?.content}</Typography>
                  </Box>
                </Box>
              );
            })}
          </>
        ) : (
          <Box textAlign="center" marginY={4}>
            <Typography variant="h3">
              Please Select User or Room To Start Chat ☺.
            </Typography>
          </Box>
        )}

        <div ref={messagesEndRef} />
      </Paper>

      <Box display="flex" marginTop={2}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={sendMessage}
          style={{ marginLeft: "10px" }}
          disabled={!currentChat}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatMessages;
