<div class="container-full mouse-cursor-default">
	<div class="col-sm-3">
		<div class="folders-box whitebox">
			<h2>Ordner</h2>
			<ul id="folders"></ul>
			<span class="glyphicon glyphicon-plus mouse-cursor-pointer" id="createFolder" aria-hidden="true" data-toggle="tooltip" title="Add Folder"></span>
			<span class="glyphicon glyphicon-pencil mouse-cursor-pointer" id="updateFolder" aria-hidden="true" data-toggle="tooltip" title="Edit Folder"></span>
		</div>
	</div>
	<div class="col-sm-9">
		<div class="passwords-box whitebox">
			<h2 class="text-center">Password</h2>
			<table class="table ">
				<thead>
					<tr>
						<th>Title</th>
                        <th>URL</th>
						<th>Username</th>
						<th>Password</th>
						<th></th>

					</tr>
				</thead>
				<tbody id="password-content"></tbody>
			</table>
            <div class="text-center">
			     <span class="glyphicon glyphicon-plus mouse-cursor-pointer" id="createPassword" aria-hidden="true" data-toggle="tooltip" title="Add Password"> </span>
            </div>
		</div>
	</div>

</div>

<!-- Modal  For Editing the Password-->
<div class="modal fade mouse-cursor-default" id="passwordEditModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title" id="myModalLabel">Passwort bearbeiten</h4>
			</div>
			<div class="modal-body">
				<form class="form-horizontal">
					<div class="form-group">
						<label class="col-sm-2 control-label">Titel:</label>
						<div class="col-sm-10">
							<input class="form-control" type="text" id="passwordEdit-title">
						</div>
					</div>
                    <div class="form-group">
						<label class="col-sm-2 control-label">URL:</label>
						<div class="col-sm-10">
							<input class="form-control" type="text" id="passwordEdit-website_url">
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label">Username:</label>
						<div class="col-sm-10">
							<input class="form-control" id="passwordEdit-username">
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label">Passwort:</label>
						<div class="col-sm-10">
							<input class="form-control" type="text" id="passwordEdit-password">
						</div>
					</div>
					<input type="hidden" value="" id="passwordEdit-token">

				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">
					Close
				</button>
				<button type="button" class="btn btn-danger btn-passwordEdit-delete">
					Delete
				</button>
				<button type="button" class="btn btn-primary btn-passwordEdit-save">
					Save changes
				</button>
			</div>
		</div>
	</div>
</div>

<!-- Modal  For Editing the Folder-->
<div class="modal fade mouse-cursor-default" id="folderEditModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title" id="myModalLabel">Ordner bearbeiten</h4>
			</div>
			<div class="modal-body">
				<form class="form-horizontal">
					<div class="form-group">
						<label class="col-sm-2 control-label">Titel:</label>
						<div class="col-sm-10">
							<input class="form-control" type="text" id="folderEdit-title">
						</div>
					</div>
					<input type="hidden" value="" id="folderEdit-token">

				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">
					Close
				</button>
				<button type="button" class="btn btn-danger btn-folderEdit-delete">
					Delete
				</button>
				<button type="button" class="btn btn-primary btn-folderEdit-save">
					Save changes
				</button>
			</div>
		</div>
	</div>
</div>