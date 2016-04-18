var Status = React.createClass({
  loadStatusFromServer: function() {
    $.ajax({
      url: './api.json',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data.result});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('Error fetching JSON', status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadStatusFromServer();
    setInterval(this.loadStatusFromServer, 500);
  },
  render: function() {
    if(this.state){
      return (
        <div className="status__wrapper container">
          <Status__overall data={this.state.data} />
          <Status__statusItems data={this.state.data} />
        </div>
      );
    } else {
      return null;
    }
  }
});

var Status__overall = React.createClass({
  render: function () { return (
    <section className="status__overall">
      <h2 className="status__overall__title">All Systems {this.props.data.status_overall.status}</h2>
    </section>
); } });

var Status__statusItems = React.createClass({
  render: function () {
    var statusItems = this.props.data.status.map(function(item, index){
      return (
        <article className="breakdown__item bounceInDown animated" data-status={item.status_code} key={index}>
          <div className="col1">
            <h3>{item.name}</h3>
            <Status__itemLocations data={item.containers} />
          </div>
          <div className="col2">
            {item.status}
          </div>
        </article>
      );
    });

    return (
      <section className="status__breakdown">
        {statusItems};
      </section>
    );
  }
});

var Status__itemLocations = React.createClass({
  render: function () {
    var itemLocations = this.props.data.map(function(location, index){
      return (
      <li className="item__location" key={index} title={'Updated '+moment(location.updated).toNow(true)+' ago'}>
        {location.name}
      </li>
      );
    });

    return (
      <ul className="item__locations">
      {itemLocations}
      </ul>
    );
  }
});

//render
ReactDOM.render(
<Status />, document.getElementById('status') );
