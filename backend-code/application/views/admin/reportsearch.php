<section>

    <div class="container-fluid">

        <div class="page-header page-header-canteen clearfix">
            <h1>Canteen Reports</h1>
            <p>100 Results</p>
        </div>

        <div class="row">

            <div class="col-sm-4 col-md-3">

                <div class="form-sort">

                    <h2 id="js-sort-button">Filter</h2>

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
                                <select id="incident-unit-number" class="form-control" name="incident-unit-number">
                                    <option>001</option>
                                    <option>002</option>
                                    <option>003</option>
                                    <option>004</option>
                                    <option>005</option>
                                </select>
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
                                <input id="incident-zipcode" class="form-control" name="incident-zipcode" type="text">
                            </div>

                            <input class="btn btn-default" type="submit" value="Submit">
                            <input class="btn btn-link" type="reset" value="Reset">

                        </form>

                    </div>

                </div>
            </div>

            <div class="report-data-container col-sm-8 col-md-9">

                <div class="table-responsive">

                    <table id="js-report-table" class="table table-stripped table-hover sortable report-table">

                        <thead>
                        <th>Date <span class="glyphicon glyphicon-chevron" aria-hidden="true"></span></th>
                        <th>Unit # <span class="glyphicon glyphicon-chevron" aria-hidden="true"></span></th>
                        <th>Type of Call <span class="glyphicon glyphicon-chevron" aria-hidden="true"></span></th>
                        <th>Zip Code <span class="glyphicon glyphicon-chevron" aria-hidden="true"></span></th>
                        </thead>

                        <tr>
                            <td data-dateformat="MM-DD-YYYY"><a href="/report.html">01/08/2015</a></td>
                            <td><a href="/report.html">001</a></td>
                            <td><a href="/report.html">Fire/ Alarm/ Companies</a></td>
                            <td><a href="/report.html">15222</a></td>
                        </tr>
                        <tr>
                            <td data-dateformat="MM-DD-YYYY"><a href="/report.html">01/01/2015</a></td>
                            <td><a href="/report.html">004</a></td>
                            <td><a href="/report.html">Hazmat</a></td>
                            <td><a href="/report.html">15218</a></td>
                        </tr>
                        <tr>
                            <td data-dateformat="MM-DD-YYYY"><a href="/report.html">01/08/2015</a></td>
                            <td><a href="/report.html">001</a></td>
                            <td><a href="/report.html">Maintenance</a></td>
                            <td><a href="/report.html">16503</a></td>
                        </tr>
                        <tr>
                            <td data-dateformat="MM-DD-YYYY"><a href="/report.html">01/08/2015</a></td>
                            <td><a href="/report.html">001</a></td>
                            <td><a href="/report.html">Maintenance</a></td>
                            <td><a href="/report.html">15222</a></td>
                        </tr>
                        <tr>
                            <td data-dateformat="MM-DD-YYYY"><a href="/report.html">01/08/2015</a></td>
                            <td><a href="/report.html">001</a></td>
                            <td><a href="/report.html">Flood</a></td>
                            <td><a href="/report.html">15222</a></td>
                        </tr>
                        <tr>
                            <td data-dateformat="MM-DD-YYYY"><a href="/report.html">01/08/2015</a></td>
                            <td><a href="/report.html">001</a></td>
                            <td><a href="/report.html">Special Event</a></td>
                            <td><a href="/report.html">15123</a></td>
                        </tr>
                        <tr>
                            <td data-dateformat="MM-DD-YYYY"><a href="/report.html">07/30/2014</a></td>
                            <td><a href="/report.html">001</a></td>
                            <td><a href="/report.html">Fire/ Alarm/ Companies</a></td>
                            <td><a href="/report.html">16518</a></td>
                        </tr>
                        <tr>
                            <td data-dateformat="MM-DD-YYYY"><a href="/report.html">01/01/2014</a></td>
                            <td><a href="/report.html">001</a></td>
                            <td><a href="/report.html">Other</a></td>
                            <td><a href="/report.html">15222</a></td>
                        </tr>

                    </table>

                </div>

            </div>
        </div>

    </div>
</section>