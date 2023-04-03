import random
import json
import textwrap
import torch
import sys
import base64

from model import NeuralNet
from nltk_utils import bag_of_words, tokenize

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

with open('intents.json', 'r') as json_data:
    intents = json.load(json_data)

FILE = "data.pth"
data = torch.load(FILE)

input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
all_words = data['all_words']
tags = data['tags']
model_state = data["model_state"]

model = NeuralNet(input_size, hidden_size, output_size).to(device)
model.load_state_dict(model_state)
model.eval()

bot_name = "J"
# print("Let's chat! (type 'quit' to exit)")
while True:
    # sentence = "do you use credit cards?"
    # print("You: " + "\t", end="")
    sentence = input()
    if sentence == "quit":
        break

    sentence = tokenize(sentence)
    X = bag_of_words(sentence, all_words)
    """This line reshapes the X array so that it has a shape of (1, len(all_words)). 
    This is necessary because the neural network model expects input in the form of 
    a batch of data, even if the batch size is just one."""
    X = X.reshape(1, X.shape[0])
    """ This line converts the NumPy array to a PyTorch tensor and moves it to the 
    device specified by the device variable. This is necessary because the neural 
    network model is likely to be implemented using PyTorch and may be optimized 
    to run on a specific device such as a GPU."""
    X = torch.from_numpy(X).to(device)

    output = model(X)
    _, predicted = torch.max(output, dim=1)

    tag = tags[predicted.item()]

    """Softmax is a mathematical function that converts a vector of real 
    numbers into a probability distribution."""
    probs = torch.softmax(output, dim=1)

    prob = probs[0][predicted.item()]
    if prob.item() > 0.75:
        for intent in intents['intents']:
            if tag == intent["tag"]:
                bot_response = random.choice(intent['responses'])
                bot_response = textwrap.fill(bot_response, width=100)
                # print((bot_name + ": "), end="")
                # print("\t" + (bot_response))
                print(bot_response)
    else:
        print(f"{bot_name}: I do not understand...")
