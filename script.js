const { applyMiddleware, createStore, combineReducers, bindActionCreators } = Redux;
const { Provider, connect } = ReactRedux;

marked.setOptions({
  breaks: true,
  sanitize: true });

//Redux
const act = 'ACTION';
const initalMessage = `#Hello
##Sub-heading
**bold**   
Shopping list:
* apples
* oranges
* pears  

*[Francesco Agnoletto](https://twitter.com/fragno92)*
> Block Quotes! 
inline Code

\`\`Use  in your Markdown file.\`\`

Codeblock  
\`\`\`
{\"Firstname\":\"Ann\",
\"Lastname\":\"Rabiu\"}
\`\`\`

![Redux React Logo](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrFi43PZh-zieEBIku2KnbH_Usg8gLvz8E6CDgM8IU8AtzIlDA&s)`;
const defaultState = { message: initalMessage };


const creator = messages => {
  return {
    type: act,
    message: messages };

};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ACTION':
      return {
        message: action.message };

    default:
      return defaultState;}

};

const store = Redux.createStore(reducer);



//React

class Interpret extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: this.props.thestate.message,
      editorSize: false,
      previewSize: false };

    this.text = this.text.bind(this);
    this.markedText = this.markedText.bind(this);
    this.handleEditorSize = this.handleEditorSize.bind(this);
    this.handlePreviewSize = this.handlePreviewSize.bind(this);
  }
  handleEditorSize() {
    this.setState({
      editorSize: !this.state.editorSize });
  }

  handlePreviewSize() {
    this.setState({
      previewSize: !this.state.previewSize });
  }
  async text(event) {
    await this.setState({
      input: event.target.value });

    this.props.edited(this.state.input);
  }
  markedText() {
    const texter = this.state.input;
    const stateText = marked(texter);
    return { __html: stateText };
  }
  render() {
    const size = this.state.editorSize ?
    ['editing Max', 'fa fa-compress', 'previewContainer hide'] :
    this.state.previewSize ?
    ['editing hide', 'fa fa-compress', 'previewContainer Max'] :
    ['editing', 'fas fa-expand-arrows-alt', 'previewContainer'];
    return /*#__PURE__*/(
      React.createElement(React.Fragment, null, /*#__PURE__*/
      React.createElement("div", { className: size[0] }, /*#__PURE__*/
      React.createElement("div", { class: "eheader" }, /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("i", { class: "fas fa-fire" }), /*#__PURE__*/
      React.createElement("span", null, "Editor")), /*#__PURE__*/

      React.createElement("button", { onClick: this.handleEditorSize }, /*#__PURE__*/
      React.createElement("i", { className: size[1] }, " "))), /*#__PURE__*/



      React.createElement("textarea", { id: "editor", onChange: this.text, value: this.state.input })), /*#__PURE__*/

      React.createElement("div", { className: size[2] }, /*#__PURE__*/
      React.createElement("div", { className: "header" }, /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("i", { className: "fas fa-fire" }), /*#__PURE__*/
      React.createElement("span", null, "Previewer")), /*#__PURE__*/

      React.createElement("button", { onClick: this.handlePreviewSize }, /*#__PURE__*/
      React.createElement("i", { className: size[1] }))), /*#__PURE__*/


      React.createElement("div", { id: "preview", dangerouslySetInnerHTML: this.markedText() }))));



  }}


//ReactRedux
const mapStateToProps = state => {
  return {
    thestate: state };

};

const mapDispatchToProps = dispatch => {
  return {
    edited: messages => {
      dispatch(creator(messages));
    } };

};

const Container = connect(mapStateToProps, mapDispatchToProps)(Interpret);

class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return /*#__PURE__*/(
      React.createElement(Provider, { store: store }, /*#__PURE__*/
      React.createElement(Container, null)));


  }}
;

ReactDOM.render( /*#__PURE__*/React.createElement(AppWrapper, null), document.getElementById('app'));