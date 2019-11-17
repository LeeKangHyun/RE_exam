type action =
  | Tick;

type state = {count: int};

[@react.component]
let make = (~name, ~children) => {
  let (show, setShow) = React.useState(() => true);
  let (editing, setEditing) = React.useState(() => false);
  let (value, onChange) = React.useState(() => name);
  let (state, dispatch) =
    React.useReducer(
      (state, action) =>
        switch (action) {
        | Tick => {count: state.count + 1}
        },
      {count: 0},
    );
  let onSubmit = event => Js.Console.log(event);
  let onCancel = _evt => setEditing(_ => false);
  let onFocus = event => ReactEvent.Focus.target(event)##select();

  React.useEffect1(
    () => {
      onChange(_ => name);
      None;
    },
    [|name|],
  );

  React.useEffect(() => {
    let id =
      Js.Global.setInterval(
        () => setShow(previousShow => !previousShow),
        1000,
      );

    Some(() => Js.Global.clearInterval(id));
  });

  React.useEffect(() => {
    let timerId = Js.Global.setInterval(() => dispatch(Tick), 1000);
    Some(() => Js.Global.clearInterval(timerId));
  });

  let style =
    if (show) {
      ReactDOMRe.Style.make(~opacity="1", ~transition="opacity 1s", ());
    } else {
      ReactDOMRe.Style.make(~opacity="0", ~transition="opacity 1s", ());
    };

  if (editing) {
    <form
      onSubmit={_ => {
        setEditing(_ => false);
        onSubmit(value);
      }}
      onBlur=onCancel>
      <input
        onBlur=onCancel
        onFocus
        onChange={event => onChange(ReactEvent.Form.target(event)##value)}
        value
      />
    </form>;
  } else {
    <article>
      <span onDoubleClick={_evt => setEditing(_ => true)}>
        value->React.string
      </span>
      <p style> children </p>
      <p> {React.string(name ++ string_of_int(state.count))} </p>
    </article>;
  };
};
