
class Timer extends React.Component {
    onDelete = () => {
        this.props.deleteTimerCard({
            id: this.props.id
        })
    };

    makingFunc = (e) => {
        console.log('making func clicked', e);
        this.props.elapsed = 1;
    };

    render() {
        const elapsedString = helpers.renderElapsedString(this.props.elapsed, this.props.runningSince);
        return (
            <div className='ui centered card'>
                <div className='content'>
                    <div className='header'>
                        {this.props.title}
                    </div>
                    <div className='meta'>
                        {this.props.project}
                    </div>
                    <div className='center aligned description'>
                        <h2>
                            {elapsedString}
                        </h2>
                    </div>
                    <div className='extra content'>
            <span className='right floated edit icon' onClick={this.props.toggleTimerForm}>
              <i className='edit icon'/>
            </span>
                        <span className='right floated trash icon' onClick={this.onDelete}>
              <i className='trash icon'/>
            </span>
                    </div>
                </div>
                //start her
                <div className='ui bottom attached blue basic button' onClick={this.makingFunc}>
                    Start
                </div>
            </div>
        );
    }
}

export default Timer;