/*
  eslint-disable react/prefer-stateless-function, react/jsx-boolean-value,
  no-undef, jsx-a11y/label-has-for, react/jsx-first-prop-new-line
*/

class TimersDashboard extends React.Component {

    state = {
        timers: [
            {
                title: 'Practice squat',
                project: 'Gym Chores',
                id: uuid.v4(),
                elapsed: 5456099,
                runningSince: Date.now(),
            },
            {
                title: 'Bake squash',
                project: 'Kitchen Chores',
                id: uuid.v4(),
                elapsed: 1273998,
                runningSince: null,

            },
        ],
    };

    // Inside TimersDashboard
    handleCreateFormSubmit = (timer) => {
        this.createTimer(timer);
    };

    createTimer = (timer) => {
        const t = helpers.newTimer(timer);
        this.setState({
            timers: this.state.timers.concat(t),
        });
    };

    startTimer = () => {


    }
    updateFromTimerForm = (attrs) => {
        this.setState({
            timers: this.state.timers.map((timer) => {
                if (timer.id === attrs.id) {
                    return Object.assign({}, timer, {title: attrs.title, project: attrs.project});
                } else {
                    return timer
                }
            })
        })
    };
    deleteFromTimerDashboard = (attrs) => {
        this.setState({
            timers: this.state.timers.filter((timer) => {
                if (timer.id === attrs.id) {
                    return false;
                } else {
                    return true;
                }
            })
        })
    };

    render() {
        return (
            <div className='ui three column centered grid'>
                <div className='column'>
                    <EditableTimerList
                        timers={this.state.timers}
                        updateFromTimerForm={this.updateFromTimerForm}
                        deleteFromTimerDashboard={this.deleteFromTimerDashboard}

                    />
                    <ToggleableTimerForm
                        onFormSubmit={this.handleCreateFormSubmit}
                    />
                </div>
            </div>

        );
    }
}

class ToggleableTimerForm extends React.Component {
    state = {
        isOpen: false,
    };

    // Inside ToggleableTimerForm
    handleFormOpen = () => {
        this.setState({isOpen: true});
    };

    handleFormClose = () => {
        this.setState({isOpen: false});
    };

    handleFormSubmit = (timer) => {
        this.props.onFormSubmit(timer);
        this.setState({isOpen: false});
    };

    render() {
        if (this.state.isOpen) {
            return (
                <TimerForm
                    onFormSubmit={this.handleFormSubmit}
                    onFormClose={this.handleFormClose}
                />
            );
        } else {
            return (
                <div className='ui basic content center aligned segment'>
                    <button
                        className='ui basic button icon'
                        onClick={this.handleFormOpen}>
                        <i className='plus icon'/>
                    </button>
                </div>
            );
        }
    }
}

class EditableTimerList extends React.Component {
    render() {
        const timers = this.props.timers.map((timer) => (
            <EditableTimer
                key={timer.id}
                id={timer.id}
                title={timer.title}
                project={timer.project}
                elapsed={timer.elapsed}
                runningSince={timer.runningSince}
                updateFromTimerForm={this.props.updateFromTimerForm}
                deleteFromTimerDashboard={this.props.deleteFromTimerDashboard}


            />
        ));
        return (
            <div id='timers'>
                {timers}
            </div>
        );
    }
}

class EditableTimer extends React.Component {
    state = {
        editFormOpen: false,
    };
    toggleTimerForm = () => {
        this.setState({editFormOpen: true})
    };
    onFormClose = () => {
        this.setState({editFormOpen: false})

    };
    deleteTimerCard = () => {
        this.setState()
    }

    render() {
        if (this.state.editFormOpen) {
            return (
                <TimerForm
                    id={this.props.id}
                    title={this.props.title}
                    project={this.props.project}
                    onFormClose={this.onFormClose}
                    onFormSubmit={this.props.updateFromTimerForm}


                />
            );
        } else {
            return (
                <Timer
                    id={this.props.id}
                    title={this.props.title}
                    project={this.props.project}
                    elapsed={this.props.elapsed}
                    runningSince={this.props.runningSince}
                    toggleTimerForm={this.toggleTimerForm}
                    deleteTimerCard={this.props.deleteFromTimerDashboard}

                />
            );
        }
    }
}

class Timer extends React.Component {
    onDelete = () => {
        this.props.deleteTimerCard({
            id: this.props.id
        })
    };

    makingFunc = (e) => {
        console.log('making func clicked', e);
        console.log('still not working', e);

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

class TimerForm extends React.Component {
    state = {
        title: this.props.title || '',
        project: this.props.project || '',
    };

    handleTitleChange = (e) => {
        this.setState({title: e.target.value});
    };

    handleProjectChange = (e) => {
        this.setState({project: e.target.value});
    };

    handleSubmit = () => {
        this.props.onFormSubmit({
            id: this.props.id,
            title: this.state.title,
            project: this.state.project,
        });
        this.props.onFormClose()
    };

    render() {
        const submitText = this.props.id ? 'Update' : 'Create';
        return (
            <div className='ui centered card'>
                <div className='content'>
                    <div className='ui form'>
                        <div className='field'>
                            <label>Title</label>
                            <input
                                type='text'
                                value={this.state.title}
                                onChange={this.handleTitleChange}
                            />
                        </div>
                        <div className='field'>
                            <label>Project</label>
                            <input
                                type='text'
                                value={this.state.project}
                                onChange={this.handleProjectChange}
                            />
                        </div>
                        <div className='ui two bottom attached buttons'>
                            <button
                                className='ui basic blue button'
                                onClick={this.handleSubmit}>
                                {submitText}
                            </button>
                            <button
                                className='ui basic red button'
                                onClick={this.props.onFormClose}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <TimersDashboard/>,
    document.getElementById('content')
);
