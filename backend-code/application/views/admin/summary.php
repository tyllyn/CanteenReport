<section>

    <div class="container-fluid">

        <div class="page-header page-header-canteen">
            <h1>Summary</h1>
            <button class="btn btn-default btn-print glyphicon glyphicon-print">Print</button>
        </div>

        <div class="row">

            <div class="col-sm-4 col-md-3">

                <div class="form-sort">

                    <h2 id="js-sort-button">Create Summary</h2>

                    <div id="js-sort-container" class="sort-form-container">

                        <form>

                            <div class="form-group">
                                <label for="start-date">Start Date</label>
                                <input id="start-date" class="form-control" name="start-date" type="date">
                            </div>

                            <div class="form-group">
                                <label for="end-date">End Date</label>
                                <input id="end-date" class="form-control" name="end-date" type="date">
                            </div>

                            <div class="form-group">
                                <label for="incident-unit-number">Unit #</label>
                                <select id="js-incident-unit-number" class="form-control" name="incident-unit-number">
                                    <option>001</option>
                                    <option>002</option>
                                    <option>003</option>
                                    <option>004</option>
                                    <option>005</option>
                                </select>
                                <button id="js-add-unit" class="btn btn-link">Add another unit</button>
                            </div>

                            <div class="form-group">

                                <label>Type of Call</label>
                                <p><em>Select all that apply</em></p>

                                <div class="input-group">
                                            <span class="input-group-addon">
                                                <input type="checkbox" id="incident-type-fire" name="incident-type-fire">
                                            </span>
                                    <label for="incident-type-fire" class="form-control">Fire/ Alarm/ Companies</label>
                                </div>

                                <div class="input-group">
                                            <span class="input-group-addon">
                                                <input type="checkbox" id="incident-type-hazmat" name="incident-type-hazmat">
                                            </span>
                                    <label for="incident-type-hazmat" class="form-control">Hazmat</label>
                                </div>

                                <div class="input-group">
                                            <span class="input-group-addon">
                                                <input type="checkbox" id="incident-type-maintenance" name="incident-type-maintenance">
                                            </span>
                                    <label for="incident-type-maintenance" class="form-control">Maintenance</label>
                                </div>

                                <div class="input-group">
                                            <span class="input-group-addon">
                                                <input type="checkbox" id="incident-type-flood" name="incident-type-flood">
                                            </span>
                                    <label for="incident-type-flood" class="form-control">Flood</label>
                                </div>

                                <div class="input-group">
                                            <span class="input-group-addon">
                                                <input type="checkbox" id="incident-type-special-event" name="incident-type-special-event">
                                            </span>
                                    <label for="incident-type-special-event" class="form-control">Special Event</label>
                                </div>

                                <div class="input-group">
                                            <span class="input-group-addon">
                                                <input type="checkbox" id="incident-type-special-other" name="incident-type-special-other">
                                            </span>
                                    <label for="incident-type-special-other" class="form-control">Other</label>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="incident-zipcode">Zip Code</label>
                                <input id="js-incident-zipcode" class="form-control" name="incident-zipcode" type="text">
                                <button id="js-add-zipcode" class="btn btn-link">Add another zipcode</button>
                            </div>

                            <div class="form-group">
                                <label for="summary-title">Create Summary Title</label>
                                <input id="summary-title" class="form-control" name="summary-title" type="text">
                            </div>

                            <input class="btn btn-default" type="submit" value="Submit">
                            <input id="js-reset-button" class="btn btn-link" type="reset" value="Reset">

                        </form>

                    </div>

                </div>
            </div>

            <div class="report-data-container col-sm-8 col-md-9">

                <div class="panel panel-default">

                    <div class="panel-heading">
                        <h3 class="panel-title">Summary Title</h3>
                    </div>

                    <ul class="list-group">
                        <li class="list-group-item"><strong>Report Status:</strong> <span class="label label-danger">Active</span></li>
                        <li class="list-group-item"><strong>Report ID Number:</strong> 001</li>
                        <li class="list-group-item"><strong>Unit Number:</strong> 001</li>
                        <li class="list-group-item"><strong>Dispatch:</strong> 01/01/2015, 9:00am</li>
                        <li class="list-group-item"><strong>In Route:</strong> 01/01/2015, 9:00am</li>
                        <li class="list-group-item"><strong>On the Scene:</strong> 01/01/2015, 9:00am</li>
                        <li class="list-group-item"><strong>Location of Incident:</strong> 123 Address Street, Pittsburgh, PA 15222</li>
                        <li class="list-group-item"><strong>Type of Call:</strong> Fire/ Alarm/ Companies, Hazmat</li>
                    </ul>

                </div>

                <div class="panel panel-default">

                    <div class="panel-heading">
                        <h3 class="panel-title">Team</h3>
                    </div>

                    <ul class="list-group">
                        <li class="list-group-item"><strong>Salvation Army - Driver:</strong> Tom Jones</li>
                        <li class="list-group-item"><strong>Salvation Army - Team member:</strong> Tina Jones</li>
                        <li class="list-group-item"><strong>Red Cross Refferal</strong> Tina Jones, 412-431-0000</li>
                    </ul>

                </div>

                <div class="page-header page-header-canteen">
                    <button class="btn btn-default btn-print pull-right glyphicon glyphicon-print">Print</button>
                </div>

            </div>

        </div>

    </div>
</section>