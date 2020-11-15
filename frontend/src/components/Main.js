import React, { Component } from 'react'
import axios from 'axios';

class Main extends Component {

  state = {
    notes: [],
    currentNote: {
      id: "",
      title: "",
      body: "",
    }
  };

  componentDidMount() {
    this.getNotes();
  }

  getNotes() {
    axios
      .get('http://127.0.0.1:8000/api/')
      .then(res => {
        this.setState({ notes: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  updateNote(note) {
    axios
      .put(`http://127.0.0.1:8000/api/${note.id}/`, note)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
        axios
          .post(`http://127.0.0.1:8000/api/`, note)
          .then(res => console.log(res))
          .catch(err => console.log(err))
      });

    // Update State
    let notes = [...this.state.notes];
    let currentNote = {...notes[note.id - 1]};
    currentNote.title = note.title;
    currentNote.body = note.body;
    notes[note.id - 1].title = currentNote.title;
    notes[note.id - 1].body = currentNote.body;
    this.setState({notes});
  }

  createNote() {
    const newNote = {
      id: this.state.notes.length + 1,
      title: "",
      body: "",
    }
    this.setState({currentNote: newNote});
    
    let notes = [...this.state.notes];
    notes.push(newNote)
    this.setState({notes})  
  }

  selectNote(data) {
    this.setState({currentNote: data});
  }

  onTitleChange(title){    
    this.setState({
      currentNote: {
        ...this.state.currentNote,
        title
      }
    });
  }

  onBodyChange(body){    
    this.setState({
      currentNote: {
        ...this.state.currentNote,
        body
      }
    });
  }

  tweetStorm(note) {
    const tweetstorm = note.body.replace(/([.?!])\s*(?=[A-Z])/g, ".\n\n\n")

    this.setState({
      currentNote: {
        id: note.id,
        title: note.title,
        body: tweetstorm
      }
    });

  }

  render() {
    return (
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col mt-2 pt-5 pb-4 overflow-y-auto">
              <div className="flex-1 px-2 bg-white space-y-1">
                <button 
                  type="button" 
                  className="w-full text-center px-4 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-50 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo active:bg-indigo-200 transition ease-in-out duration-150"
                  onClick={() => this.createNote()}
                >
                  New Note
                </button>
                {this.state.notes.map(item => (
                  <div key={item.id}>
                    <a
                    href="#" 
                    className="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
                    onClick={() => this.selectNote(item)}
                    >
                      {item.title}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      <div className="flex flex-col">
        <main className="flex-1 relative z-0 max-w-4xl overflow-y-auto focus:outline-none" tabIndex="0">
          <div className="pt-2 pb-6 mx-5 md:py-6">
              <div>
                <div className="flex flex-row space-x-2 my-1">
                  <input 
                    type="text" 
                    className="border border-gray-600 rounded py-2 px-4 text-2xl font-semibold text-gray-900" 
                    value={this.state.currentNote.title} 
                    placeholder="Title"
                    onChange={e => this.onTitleChange(e.target.value)}
                  />
                  <button 
                    className="border border-gray-600 hover:bg-indigo-800 hover:text-white rounded py-2 px-4 text-2xl font-semibold text-gray-900"
                    onClick={() => this.updateNote(this.state.currentNote)}          
                  >
                    Save
                  </button>
                  <button 
                    className="border border-gray-600 hover:bg-blue-600 bg-blue-500 text-white rounded py-2 px-4 text-2xl font-semibold"
                    onClick={() => this.tweetStorm(this.state.currentNote)}          
                  >
                    Turn to TweetStorm
                  </button>

                </div>
              </div>
              <div>
                <textarea 
                  type="text" 
                  rows="30" 
                  cols="100" 
                  className="py-2 px-4 border border-gray-600 rounded" 
                  value={this.state.currentNote.body}
                  placeholder="Body"
                  onChange={e => this.onBodyChange(e.target.value)}
                />
              </div>
          </div>
        </main>
      </div>
    </div>
    )
  }
}

export default Main
